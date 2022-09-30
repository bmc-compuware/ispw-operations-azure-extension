"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const IspwActions = require('./IspwActions');
const https = require('https');
const axios = require('axios');
const input = require('../transferObj/input');
var contextPath = "/ispw/{srid}/assignments/{assignmentId}/tasks/promote?level={level}&mname={mname}&mtype={mtype}";
const restUtis = require('../utils/RestUtils');
const CommonService = require('../services/CommonService');
const IspwReqBody = require('../transferObj/IspwReqBody');
const PromoteActionResponse = require('../transferObj/PromoteActionResponse');
class ReqBodyAttributes extends IspwReqBody {
    constructor() {
        super();
        this.runtimeConfiguration = "";
    }
}
class PromoteAssignmentAction extends IspwActions {
    constructor() {
        super();
    }
    performAction(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let prompteActionResponse = new PromoteActionResponse();
            try {
                let util = new restUtis();
                let authToken = input.cesToken;
                let reqBody = new ReqBodyAttributes();
                let reqTO = util.getIspwReqTo(input, contextPath, reqBody);
                let url = util.getCesUrl(input) + reqTO.path;
                let cmnService = new CommonService();
                let json = yield cmnService.doPostRequest(url, reqTO.reqBody, authToken);
                console.log("json", json);
                Object.assign(prompteActionResponse, json);
                console.log("prompteActionResponse " + JSON.stringify(prompteActionResponse));
            }
            catch (e) {
                console.log(e.message);
            }
            return prompteActionResponse;
        });
    }
}
module.exports = PromoteAssignmentAction;
