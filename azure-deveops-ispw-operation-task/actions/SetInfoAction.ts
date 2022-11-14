export {};
const setInfoResponse = require("../transferObj/SetInfoResponse");
const cmnService = require("../services/CommonService");
const ispwActions = require("./IspwActions");

class SetInfoAction extends ispwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let setInfoResponseObj: IspwResponse = new setInfoResponse();
    let cmnServiceObj = new cmnService();
    let rt = await cmnServiceObj.doGetRequest(input.cesUrl, input.cesToken);
    Object.assign(setInfoResponseObj, rt);
    console.log("Set Info response: " + JSON.stringify(setInfoResponseObj));
    return setInfoResponseObj;
  }
}
module.exports = SetInfoAction;
