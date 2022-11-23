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
const tl = require("azure-pipelines-task-lib/task");
const ActionFactory = require("./actions/ActionFactory");
const Input = require("./transferObj/input");
const TaskResponse = require("./transferObj/TaskResponse");
const BuildResponse = require("./transferObj/BuildResponse");
const AddTaskResponse = require("./transferObj/AddTaskResponse");
const RestUtils = require("./utils/RestUtils");
const polling_interval = 2000;
const SET_STATE_DISPATCHED = "Dispatched";
const SET_STATE_EXECUTING = "Executing";
const SET_STATE_COMPLETE = "Complete";
const SET_STATE_CLOSED = "Closed";
const SET_STATE_FAILED = "Failed";
const SET_STATE_HELD = "Held";
const SET_STATE_RELEASED = "Released";
const SET_STATE_TERMINATED = "Terminated";
const SET_STATE_WAITING_APPROVAL = "Waiting-Approval";
const SET_STATE_WAITING_LOCK = "Waiting-Lock";
function isEmpty(str) {
    return !str || str.length === 0;
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const connectionId = tl.getInput("connectionId", true);
        const cesUrl = tl.getInput("cesUrl", true);
        const action = tl.getInput("action", true);
        const payload = tl.getInput("request", true);
        const cesToken = tl.getInput("cesSecretToken");
        const skipWaitingForSetCompletion = tl.getBoolInput("skipWaitingForSetCompletion");
        const showResponseBodyInConsole = tl.getBoolInput("showResponseBodyInConsole");
        var isValidInput = connectionId != undefined &&
            cesUrl != undefined &&
            action != undefined &&
            !isEmpty(connectionId) &&
            !isEmpty(cesUrl);
        var ispwActions;
        if (isValidInput) {
            let connection = connectionId != undefined ? connectionId.split("#") : "";
            let codePage = connection[1].trim();
            let conStr = connection[0];
            let hostPortArr = conStr.split(":");
            let actionFactory = new ActionFactory();
            let util = new RestUtils();
            if (!isEmpty(action)) {
                ispwActions = actionFactory.createObj(action);
                let input = new Input(hostPortArr[0], hostPortArr[1], codePage, cesUrl, payload, cesToken, skipWaitingForSetCompletion, showResponseBodyInConsole);
                const respObject = yield ispwActions.performAction(input);
                if (respObject instanceof AddTaskResponse) {
                    let taskResponse = respObject;
                    if (taskResponse.setId) {
                        console.log(taskResponse.message);
                    }
                }
                if (!skipWaitingForSetCompletion) {
                    let setId = "";
                    let url = "";
                    if (respObject instanceof TaskResponse) {
                        let taskResp = respObject;
                        setId = taskResp.setId;
                        url = taskResp.url;
                    }
                    else if (respObject instanceof BuildResponse) {
                        let buildResp = respObject;
                        setId = buildResp.setId;
                        url = buildResp.url;
                    }
                    if (setId &&
                        (respObject instanceof TaskResponse ||
                            respObject instanceof BuildResponse)) {
                        input = new Input(hostPortArr[0], hostPortArr[1], codePage, url, {}, cesToken, skipWaitingForSetCompletion, showResponseBodyInConsole);
                        ispwActions = actionFactory.createObj("SetInfo");
                        let i = 0;
                        for (; i < 60; i++) {
                            yield sleep(polling_interval);
                            const setResponse = yield ispwActions.performAction(input);
                            let set_obj = setResponse;
                            console.log("Waiting for set to complete...");
                            if (set_obj.state == SET_STATE_FAILED) {
                                console.log("ISPW: Set " + set_obj.setid + " - action [%s] failed.", action);
                                break;
                            }
                            else if (set_obj.state == SET_STATE_TERMINATED) {
                                console.log("ISPW: Set " + set_obj.setid + " - successfully terminated.");
                                break;
                            }
                            else if (set_obj.state == SET_STATE_HELD) {
                                console.log("ISPW: Set " + set_obj.setid + " - successfully held.");
                                break;
                            }
                            else if (set_obj.state == SET_STATE_RELEASED ||
                                set_obj.state == SET_STATE_WAITING_LOCK) {
                                console.log("ISPW: Set " + set_obj.setid + " - successfully released.");
                                break;
                            }
                            else if (set_obj.state == SET_STATE_CLOSED ||
                                set_obj.state == SET_STATE_COMPLETE ||
                                set_obj.state == SET_STATE_WAITING_APPROVAL) {
                                console.log("ISPW: Action " + util.splitPascalCase(action) + " completed.");
                                break;
                            }
                            if (i == 60) {
                                console.log("Max time out reached.");
                            }
                        }
                    }
                }
                if (skipWaitingForSetCompletion) {
                    console.log("Skip waiting for the completion of the set for this job...");
                }
            }
        }
    });
}
run();
