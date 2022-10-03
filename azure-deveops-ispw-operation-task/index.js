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
const PromoteAction = require('./actions/PromoteAssignmentAction');
const IspwActions = require('./actions/IspwActions');
const SetInfoAction = require('./actions/SetInfoAction');
const ActionFactory = require('./actions/ActionFactory');
const Input = require('./transferObj/input');
const SetIdResponse = require('./transferObj/SetIdResponse');
const IspwResponse = require('./transferObj/ispwResponse');
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
    return (!str || str.length === 0);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const connectionId = "cw09.compuware.com:47624#1047"; //tl.getInput('connectionId', true); // 
        const cesUrl = "http://172.19.173.31:48226"; //tl.getInput('cesUrl', true);////
        const action = "PromoteRelease"; //tl.getInput("action", true);//"PromoteAction" //
        const payload = "releaseId=MAYANK_TES\n runtimeConfiguration=TPTP\n level=DEV1"; //tl.getInput("request",true);//"assignmentId=paly0122"; //
        const cesToken = "403601c5-2f2e-4367-8137-daa6cf229dbb"; //tl.getInput('cesSecretToken'); //"a7c35910-8775-4ba7-8b94-ad6822f9296c"//
        const skipWaitingForSetCompletion = false; //tl.getBoolInput("skipWaitingForSetCompletion") ;
        const showResponseBodyInConsole = true; //tl.getBoolInput("showResponseBodyInConsole");
        var isValidInput = connectionId != undefined && cesUrl != undefined &&
            action != undefined && !isEmpty(connectionId) && !isEmpty(cesUrl);
        var ispwActions;
        if (isValidInput) {
            let connection = connectionId != undefined ? connectionId.split('#') : "";
            let codePage = connection[1].trim();
            let conStr = connection[0];
            let hostPortArr = conStr.split(":");
            let actionFactory = new ActionFactory();
            if (!isEmpty(action)) {
                ispwActions = actionFactory.createObj(action);
                let input = new Input(hostPortArr[0], hostPortArr[1], codePage, cesUrl, payload, cesToken, skipWaitingForSetCompletion, showResponseBodyInConsole);
                const obj = yield ispwActions.performAction(input);
                if (!skipWaitingForSetCompletion) {
                    if (obj instanceof SetIdResponse) {
                        let obj1 = obj;
                        if (obj1.setId != undefined) {
                            input = new Input(hostPortArr[0], hostPortArr[1], codePage, obj1.url, {}, cesToken, skipWaitingForSetCompletion, showResponseBodyInConsole);
                            ispwActions = actionFactory.createObj("SetInfo");
                            let i = 0;
                            for (; i < 60; i++) {
                                yield sleep(polling_interval);
                                const setResponse = yield ispwActions.performAction(input);
                                let set_obj = setResponse;
                                console.log("waiting for set to complete");
                                if (set_obj.state == SET_STATE_FAILED) {
                                    console.log("ISPW: Set " + set_obj.setid + " - action [%s] failed", action);
                                    break;
                                }
                                else if (set_obj.state == SET_STATE_TERMINATED) {
                                    console.log("ISPW: Set " + set_obj.setid + " - successfully terminated");
                                    break;
                                }
                                else if (set_obj.state == SET_STATE_HELD) {
                                    console.log("ISPW: Set " + set_obj.setid + " - successfully held");
                                    break;
                                }
                                else if (set_obj.state == SET_STATE_RELEASED || set_obj.state == SET_STATE_WAITING_LOCK) {
                                    console.log("ISPW: Set " + set_obj.setid + " - successfully released");
                                    break;
                                }
                                else if (set_obj.state == SET_STATE_CLOSED || set_obj.state == SET_STATE_COMPLETE
                                    || set_obj.state == SET_STATE_WAITING_APPROVAL) {
                                    console.log("ISPW: Action " + action + " completed");
                                    break;
                                }
                                if (i == 60) {
                                    console.log("max time out reached");
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}
run();
