export {};
const IspwActions = require("./IspwActions");
const restUtis = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const TaskResponse = require("../transferObj/TaskResponse");
var contextPath =
  "/ispw/{srid}/assignments/{assignmentId}/taskIds/generate?taskId={taskId}&level={level}";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
  runtimeConfiguration: string = "";
}

class GenerateTaskAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let generateTaskActionResponse: IspwResponse =
      new TaskResponse();
    let util = new restUtis();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doPostRequest(
      url,
      reqTO.reqBody,
      input.cesToken,
      "Generate Task",
      input.showResponseBodyInConsole
    );
    Object.assign(generateTaskActionResponse, json);
    return generateTaskActionResponse;
  }
}
module.exports = GenerateTaskAction;
