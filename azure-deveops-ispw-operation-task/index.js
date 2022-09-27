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
const PromoteAction = require('./actions/PromoteAction');
const IspwActions = require('./actions/IspwActions');
const ActionFactory = require('./actions/ActionFactory');
const Input = require('./transferObj/input');
function isEmpty(str) {
    return (!str || str.length === 0);
}
function isUrlValid(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (res == null)
        return false;
    else
        return true;
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const connectionId = "cw09.compuware.com:47623#1047"; //tl.getInput('connectionId', true);
        const cesUrl = "http://localhost:48080"; //tl.getInput('cesUrl', true);
        const action = "PromoteAction"; //tl.getInput("action", true);
        const payload = "assignmentId=paly0122"; //tl.getInput("request",true);
        const cesToekn = "a7c35910-8775-4ba7-8b94-ad6822f9296c"; //tl.getInput('cesSecretToken');
        var isValidInput = connectionId != undefined && cesUrl != undefined &&
            action != undefined && !isEmpty(connectionId) && !isEmpty(cesUrl);
        var ispwActions;
        if (isValidInput) {
            let connection = connectionId.split('#');
            let codePage = connection[1].trim();
            let conStr = connection[0];
            let hostPortArr = conStr.split(":");
            let actionFactory = new ActionFactory();
            if (!isEmpty(action)) {
                ispwActions = actionFactory.createObj(action);
                let input = new Input(hostPortArr[0], hostPortArr[1], codePage, cesUrl, payload, cesToekn);
                ispwActions.performAction(input);
            }
        }
    });
}
run();
