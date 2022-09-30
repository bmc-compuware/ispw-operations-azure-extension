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
const PromoteActionResponse = require('./transferObj/PromoteActionResponse');
const IspwResponse = require('./transferObj/ispwResponse');
function isEmpty(str) {
    return (!str || str.length === 0);
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const connectionId = "cw09.compuware.com:47624#1047"; //tl.getInput('connectionId', true); // 
        const cesUrl = "http://localhost:48080"; //tl.getInput('cesUrl', true);////
        const action = "PromoteAssignment"; //tl.getInput("action", true);//"PromoteAction" //
        const payload = "assignmentId=HARY008369\n runtimeConfiguration=TPTP\n level=DEV1"; //tl.getInput("request",true);//"assignmentId=paly0122"; //
        const cesToken = "1fa526c3-6be5-4181-a4ff-10abb4c2185a"; //tl.getInput('cesSecretToken'); //"a7c35910-8775-4ba7-8b94-ad6822f9296c"//
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
                let input = new Input(hostPortArr[0], hostPortArr[1], codePage, cesUrl, payload, cesToken);
                const obj = yield ispwActions.performAction(input);
                if (obj instanceof PromoteActionResponse) {
                    let obj1 = obj;
                    if (obj1.setId != undefined) {
                        input = new Input(hostPortArr[0], hostPortArr[1], codePage, obj1.url, {}, cesToken);
                        ispwActions = actionFactory.createObj("SetInfo");
                        const setResponse = yield ispwActions.performAction(input);
                        console.log(JSON.stringify(setResponse));
                    }
                }
            }
        }
    });
}
run();
