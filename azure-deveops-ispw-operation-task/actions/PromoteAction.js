"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IspwActions = require('./IspwActions');
const https = require('https');
const axios = require('axios');
const input = require('../transferObj/input');
var contextPath = "/ispw/{srid}/assignments/{assignmentId}/tasks/promote?level={level}&mname={mname}&mtype={mtype}";
const restUtis = require('../utils/RestUtils');
const CommonService = require('../services/CommonService');
class PromoteAction extends IspwActions {
    constructor() {
        super();
    }
    performAction(input) {
        try {
            let util = new restUtis();
            let authToken = input.cesToken;
            let reqTO = util.getIspwReqTo(input, contextPath);
            console.log("req.path" + reqTO.path);
            let url = util.getCesUrl(input) + reqTO.path;
            let cmnService = new CommonService();
            console.log("url::" + url);
            let obj = { "runtimeConfiguration": "TPTP" };
            let rt = cmnService.doPostRequest(url, obj, authToken);
        }
        catch (e) {
            console.log(e.message);
        }
    }
}
module.exports = PromoteAction;
