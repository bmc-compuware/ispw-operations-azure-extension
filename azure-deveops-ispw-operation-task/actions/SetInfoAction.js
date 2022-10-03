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
const setInfoResponse = require('../transferObj/SetInfoResponse');
const cmnService = require('../services/CommonService');
const ispwActions = require('./IspwActions');
class SetInfoAction extends ispwActions {
    performAction(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let setInfoResponseObj = new setInfoResponse();
            let cmnServiceObj = new cmnService();
            let rt = yield cmnServiceObj.doGetRequest(input.cesUrl, input.cesToken);
            console.log(rt);
            Object.assign(setInfoResponseObj, rt);
            return setInfoResponseObj;
        });
    }
}
module.exports = SetInfoAction;
