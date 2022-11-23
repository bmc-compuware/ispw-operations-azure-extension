"use strict";
const ispwReqTO = require("../transferObj/IspwReqTO");
class RestUtils {
    lstParm(contextPath) {
        var re = /\{\w+\}/g;
        let arr = new Array();
        var m;
        do {
            m = re.exec(contextPath);
            if (m) {
                arr.push(m[0].substring(1, m[0].length - 1));
            }
        } while (m);
        return arr;
    }
    getIspwReqTo(input, contextPath, reqBody) {
        let reqTo = new ispwReqTO();
        reqTo.srcId = input.host + "-" + input.port;
        contextPath = contextPath.replace("{srid}", reqTo.srcId);
        let params = this.lstParm(contextPath);
        let req = input.payload;
        let lineArr = req.split("\n");
        for (var line of lineArr) {
            line = line.toString().trim();
            if (line.startsWith("#")) {
                continue;
            }
            let indexOfEqualSign = line.indexOf("=");
            if (indexOfEqualSign != -1) {
                var name = line.substring(0, indexOfEqualSign).trim();
                var value = line.substring(indexOfEqualSign + 1, line.length);
                let reqBody1 = reqBody.toPlainObject();
                if (reqBody1.hasOwnProperty(name)) {
                    reqTo.reqBody[name] = value;
                }
                if (params.indexOf(name) != -1) {
                    if (value.indexOf(",") != -1) {
                        contextPath = contextPath.replace(name + "={" + name + "}", this.getRealValue(name, value));
                    }
                    else {
                        contextPath = contextPath.replace("{" + name + "}", value.trim());
                    }
                }
            }
        }
        reqTo.path = this.cleanContextPath(contextPath);
        return reqTo;
    }
    getRealValue(name, value) {
        let realValue = "";
        let values = value.split(",");
        for (let value of values) {
            realValue = realValue + name + "=" + value + "&";
        }
        return realValue.slice(0, -1);
    }
    cleanContextPath(contextPath) {
        let resultPath = contextPath;
        let arr = this.lstParm(contextPath);
        contextPath = contextPath.replace("?&", "?");
        let index = contextPath.indexOf("?");
        if (index != -1) {
            let s1 = contextPath.substring(0, index);
            let s2 = contextPath.substring(index);
            for (let obj of arr) {
                s2 = s2.replace(obj + "={" + obj + "}", "");
            }
            s2 = s2.replace(/[&]+/g, "&");
            s2 = s2.replace("?&", "?");
            while (s2.endsWith("&")) {
                s2 = s2.substring(0, s2.length - 1);
            }
            resultPath = s1 + s2;
        }
        return resultPath;
    }
    getCesUrl(ip) {
        if (!ip.cesUrl.trim().startsWith("http")) {
            throw new Error("Not A Valid Url");
        }
        let url = new URL(ip.cesUrl);
        let protocol = url.protocol;
        let host = url.host;
        let port = Number(url.port);
        if (port < 0) {
            if ("http" === protocol.toLowerCase()) {
                port = 80;
            }
            else if ("https" === protocol.toLowerCase()) {
                port = 443;
            }
        }
        return protocol + "//" + host;
    }
    splitPascalCase(word) {
        return word.replace(/([A-Z]+)/g, "$1").replace(/([A-Z][a-z])/g, " $1").trim();
    }
}
module.exports = RestUtils;
