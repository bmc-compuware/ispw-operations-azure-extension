const ispwReqTO = require('../transferObj/IspwReqTO');
class RestUtils {

    lstParm(contextPath: string) {
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

    getIspwReqTo(input: Input, contextPath: string) {
        let reqTo = new ispwReqTO();
        reqTo.srcId = input.host + '-' + input.port;
        contextPath = contextPath.replace('{srid}', reqTo.srcId)
        let params = this.lstParm(contextPath);
        console.log(params);
        let req = input.payload
        let lineArr = req.split('\n');
        for (var line of lineArr) {
            line = line.toString().trim();
            if (line.startsWith('#')) {
                continue;
            }
            let indexOfEqualSign = line.indexOf('=');
            if (indexOfEqualSign != -1) {
                var name: string = line.substring(0, indexOfEqualSign).trim();
                var value = line.substring(indexOfEqualSign + 1, line.length)
                console.log(name, value);
                if (params.indexOf(name) != -1) {
                    contextPath = contextPath.replace('{' + name + '}', value.trim());
                }

            }
        }
        reqTo.path = this.cleanContextPath(contextPath);
        return reqTo;

    }

    cleanContextPath(contextPath: string) {
        console.log("contextpath", contextPath);
        let resultPath: string = contextPath;
        let arr = this.lstParm(contextPath);
        let re = /[&]+/; 
        contextPath = contextPath.replace("?&", "?");
        let index = contextPath.indexOf("?");
        if (index != -1) {
            let s1 = contextPath.substring(0, index);
            let s2 = contextPath.substring(index);
            for (let obj of arr) {
                s2 = s2.replace(obj + "={" + obj + "}", "");
            }

            s2 = s2.replace(re, "&");
            console.log("s2",s2);
            if (s2.endsWith("&")) {
                s2 = s2.substring(0, s2.length - 1);
            }
            resultPath = s1 + s2;
        }
        return resultPath;

    }
    getCesUrl(ip: Input) {
        if (!ip.cesUrl.trim().startsWith('http')) {
            throw new Error('Not A Valid Url');
        }
        let url = new URL(ip.cesUrl);
        let protocol = url.protocol;
        console.log("protocol::"+protocol);
        let host = url.host;
        console.log("host:::"+host);
        let port: number = Number(url.port);
        if (port < 0) {
            if ("http" === protocol.toLowerCase()) {
                port = 80;
            } else if ("https" === protocol.toLowerCase()) {
                port = 443;
            }
        }

        return protocol + "//" + host;


    }


}

module.exports = RestUtils;
