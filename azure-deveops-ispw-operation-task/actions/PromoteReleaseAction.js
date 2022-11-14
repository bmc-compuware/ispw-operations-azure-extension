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
const TaskResponse = require("../transferObj/TaskResponse");
var contextPath = "/ispw/{srid}/releases/{releaseId}/tasks/promote?level={level}&mname={mname}&mtype={mtype}";
const restUtis = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const IspwActions = require("../actions/IspwActions");
class ReqBodyAttributes extends IspwReqBody {
    constructor() {
        super();
        this.runtimeConfiguration = "";
        this.changeType = "";
        this.executionStatus = "";
        this.dpenvlst = "";
        this.system = "";
        this.autoDeploy = "";
        this.deployActiveDate = "";
        this.deployActiveTime = "";
        this.deployImplementationDate = "";
        this.deployImplementationTime = "";
        this.override = "";
        this.taskId = [];
    }
}
class PromoteReleaseAction extends IspwActions {
    performAction(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let prompteActionResponse = new TaskResponse();
            let restUtilObj = new restUtis();
            let reqBody = new ReqBodyAttributes();
            let reqTO = restUtilObj.getIspwReqTo(input, contextPath, reqBody);
            let url = restUtilObj.getCesUrl(input) + reqTO.path;
            let cmnService = new CommonService();
            let json = yield cmnService.doPostRequest(url, reqTO.reqBody, input.cesToken, "Promote Release", input.showResponseBodyInConsole);
            Object.assign(prompteActionResponse, json);
            return prompteActionResponse;
        });
    }
}
module.exports = PromoteReleaseAction;
