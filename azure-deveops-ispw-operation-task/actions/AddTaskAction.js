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
const restUtis = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const AddTaskResponse = require("../transferObj/AddTaskResponse");
var contextPath = "/ispw/{srid}/assignments/{assignmentId}/task/add?checkout={checkout}";
class ReqBodyAttributes extends IspwReqBody {
    constructor() {
        super();
        this.action = "";
        this.application = "";
        this.checkoutFromLevel = "";
        this.owner = "";
        this.path = "";
        this.releaseId = "";
        this.runtimeConfiguration = "";
        this.stream = "";
        this.subAppl = "";
        this.taskName = "";
        this.type = "";
    }
}
class AddTaskAction extends IspwActions {
    performAction(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let addTaskActionResponse = new AddTaskResponse();
            let util = new restUtis();
            let reqBody = new ReqBodyAttributes();
            let cmnService = new CommonService();
            let reqTO = util.getIspwReqTo(input, contextPath, reqBody);
            let url = util.getCesUrl(input) + reqTO.path;
            let json = yield cmnService.doPostRequest(url, reqTO.reqBody, input.cesToken, "Add Task", input.showResponseBodyInConsole);
            Object.assign(addTaskActionResponse, json);
            return addTaskActionResponse;
        });
    }
}
module.exports = AddTaskAction;
