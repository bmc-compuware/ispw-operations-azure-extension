export {};
const IspwActions = require("./IspwActions");
const restUtis = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const TaskResponse = require("../transferObj/TaskResponse");
var contextPath =
  "/ispw/{srid}/releases/{releaseId}/tasks/generate?level={level}&mname={mname}&mtype={mtype}";
  
class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
  runtimeConfiguration: string = "";
}

class GenerateTasksInReleaseAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let generateTasksInReleaseActionResponse: IspwResponse = new TaskResponse();
    let util = new restUtis();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doPostRequest(
      url,
      reqTO.reqBody,
      input.cesToken,
      "Generate Tasks In Release",
      input.showResponseBodyInConsole
    );
    Object.assign(generateTasksInReleaseActionResponse, json);
    return generateTasksInReleaseActionResponse;
  }
}
module.exports = GenerateTasksInReleaseAction;
