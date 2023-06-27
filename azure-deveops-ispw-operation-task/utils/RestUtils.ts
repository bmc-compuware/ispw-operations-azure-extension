const ispwReqTO = require("../transferObj/IspwReqTO");
import tl = require("azure-pipelines-task-lib/task");
import * as fs from 'fs';
import { existsSync, unlinkSync, createWriteStream } from "fs";
import * as path from "path";

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

  getIspwReqTo(input: Input, contextPath: string, reqBody: IspwReqBody) {
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
        var name: string = line.substring(0, indexOfEqualSign).trim();
        var value = line.substring(indexOfEqualSign + 1, line.length);
        let reqBody1 = reqBody.toPlainObject();
        if (reqBody1.hasOwnProperty(name)) {
          reqTo.reqBody[name] = value;
        }

        if (params.indexOf(name) != -1) {
          if (value.indexOf(",") != -1) {
            contextPath = contextPath.replace(
              name + "={" + name + "}",
              this.getRealValue(name, value)
            );
          } else {
            contextPath = contextPath.replace("{" + name + "}", value.trim());
          }
        }
      }
    }
    reqTo.path = this.cleanContextPath(contextPath);
    return reqTo;
  }

  getIspwReqToForBuildAutomatically(input: Input, contextPath: string, reqBody: IspwReqBody){
    let reqTo = new ispwReqTO();
    reqTo.srcId = input.host + "-" + input.port;
    contextPath = contextPath.replace("{srid}", reqTo.srcId);
    let params = this.lstParm(contextPath); 
        //reading file 
      let curWk = tl.getVariable("Build.SourcesDirectory"); 
        if (!curWk) {
          throw new Error(
             "Workspace not found."
           );
         }

        curWk = path.resolve(curWk);  

        const filename = path.join(curWk, "automaticBuildParams.txt");

      if (existsSync(filename)){
          const loadedautoBuildParms = fs.readFileSync(filename, 'utf-8');
          const AssgnDetails = JSON.parse(loadedautoBuildParms);
          //console.log(AssgnDetails);

        if("containerId" in AssgnDetails) 
        {
          contextPath = contextPath.replace("{assignmentId}", AssgnDetails.containerId);
        }
        
        if("releaseId" in AssgnDetails)
        {
          contextPath = contextPath.replace("{releaseId}", AssgnDetails.releaseId);
        }
        
        if("taskLevel" in AssgnDetails)
        {
          contextPath = contextPath.replace("{level}", AssgnDetails.taskLevel);
        }

        if("taskIds" in AssgnDetails)
        {
          //for(var task in AssgnDetails.taskIds){  }
          contextPath = contextPath.replace("{taskId}", AssgnDetails.taskIds);
        }
        //
        if("application" in AssgnDetails)
        {
          contextPath = contextPath.replace("{application}", AssgnDetails.application);
          //contextPath = contextPath.replace("{application}", input. );
        }

        if("subAppl" in AssgnDetails)
        {
          contextPath = contextPath.replace("{subAppl}", AssgnDetails.subAppl);
          //contextPath = contextPath.replace("{subAppl}", input. );
        }

        if("mname" in AssgnDetails)
        {
          contextPath = contextPath.replace("{mname}", AssgnDetails.mname);
        }

        if("mtype" in AssgnDetails)
        {
          contextPath = contextPath.replace("{mtype}", AssgnDetails.mtype);
        }

        reqTo.path = this.cleanContextPath(contextPath);
        
    }
    else {
      console.log("Unable to read automaticBuildParams. txt since file does not exist");
    }
    return reqTo;
  }

  getRealValue(name: string, value: string) {
    let realValue = "";
    let values = value.split(",");
    for (let value of values) {
      realValue = realValue + name + "=" + value + "&";
    }
    return realValue.slice(0, -1);
  }

  cleanContextPath(contextPath: string) {
    let resultPath: string = contextPath;
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
  getCesUrl(ip: Input) {
    if (!ip.cesUrl.trim().startsWith("http")) {
      throw new Error("Not A Valid Url");
    }
    let url = new URL(ip.cesUrl);
    let protocol = url.protocol;
    let host = url.host;
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
  splitPascalCase(word: string) {    
    return word.replace(/([A-Z]+)/g, "$1").replace(/([A-Z][a-z])/g, " $1").trim();
  }
}

module.exports = RestUtils;
