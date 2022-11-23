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
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const TaskResponse = require("../transferObj/TaskResponse");
var contextPath = "/ispw/{srid}/assignments/{assignmentId}/tasks/deploy?level={level}&mname={mname}&mtype={mtype}";
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
        this.taskId = [];
    }
}
class DeployAssignmentAction extends IspwActions {
    performAction(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let deployAssignmentActionResponse = new TaskResponse();
            let util = new RestUtils();
            let reqBody = new ReqBodyAttributes();
            let cmnService = new CommonService();
            let reqTO = util.getIspwReqTo(input, contextPath, reqBody);
            let url = util.getCesUrl(input) + reqTO.path;
            let json = yield cmnService.doPostRequest(url, reqTO.reqBody, input.cesToken, "Deploy Assignment", input.showResponseBodyInConsole);
            Object.assign(deployAssignmentActionResponse, json);
            return deployAssignmentActionResponse;
        });
    }
}
module.exports = DeployAssignmentAction;