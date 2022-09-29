"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IspwActions = require('./IspwActions');
const https = require('https');
const axios = require('axios');
const input = require('../transferObj/input');
var contextPath = "/ispw/{srid}/assignments/{assignmentId}/tasks/promote?level={level}&mname={mname}&mtype={mtype}";
const restUtis = require('../utils/RestUtils');
const CommonService = require('../services/CommonService');
const IspwReqBody = require('../transferObj/IspwReqBody');
class ReqBodyAttributes extends IspwReqBody {
    constructor() {
        super();
        this.runtimeConfiguration = "";
    }
}
class PromoteAction extends IspwActions {
    constructor() {
        super();
    }
    performAction(input) {
        try {
            let util = new restUtis();
            let authToken = input.cesToken;
            let reqBody = new ReqBodyAttributes();
            let reqTO = util.getIspwReqTo(input, contextPath, reqBody);
            //console.log("req.path"+reqTO.path);
            let url = util.getCesUrl(input) + reqTO.path;
            let cmnService = new CommonService();
            console.log("url::" + url);
            console.log("reqTo:::" + JSON.stringify(reqTO));
            let rt = cmnService.doPostRequest(url, reqTO.reqBody, authToken);
        }
        catch (e) {
            console.log(e.message);
        }
    }
}
module.exports = PromoteAction;
