import { ok } from 'assert';
import tl = require('azure-pipelines-task-lib/task');
const IspwActions = require('./IspwActions') 
const https = require('https');
const axios = require('axios');
const input = require('../transferObj/input');
var contextPath ="/ispw/{srid}/assignments/{assignmentId}/tasks/promote?level={level}&mname={mname}&mtype={mtype}";
const restUtis= require('../utils/RestUtils')
const CommonService = require('../services/CommonService')
const IspwReqBody = require('../transferObj/IspwReqBody')
const SetInfoResponse = require('../transferObj/SetInfoResponse')
class ReqBodyAttributes extends IspwReqBody{
    constructor(){
        super();
    }
    runtimeConfiguration :string="";   
}



class PromoteAssignmentAction extends IspwActions {
    constructor(){
        super();
       
    }
   async performAction(input:Input):Promise<IspwResponse>{
        let setInfo:IspwResponse= new SetInfoResponse();
        try{
        let util = new restUtis();
        let authToken= input.cesToken;
        let reqBody= new ReqBodyAttributes();        
        let reqTO:IspwReqTO= util.getIspwReqTo(input,contextPath,reqBody);
        let url= util.getCesUrl(input) + reqTO.path;
        let cmnService = new CommonService();
        let json= await cmnService.doPostRequest(url,reqTO.reqBody,authToken);
        Object.assign(setInfo,json);  
        console.log("setInfo"+JSON.stringify(setInfo));  
    }catch(e){
        console.log((<Error>e).message);

    }
    return setInfo;

    }
}
module.exports=PromoteAssignmentAction;




