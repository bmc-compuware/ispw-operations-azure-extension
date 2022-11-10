export {};
const IspwActions = require("./IspwActions");
const restUtis = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const TaskResponse = require("../transferObj/TaskResponse");
var contextPath =
  "/ispw/{srid}/assignments/{assignmentId}/tasks/generate?level={level}&mname={mname}&mtype={mtype}";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
  runtimeConfiguration: string = "";
}

class GenerateTasksInAssignmentAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let generateTasksInAssignmentActionResponse: IspwResponse =
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
      "Generate Tasks In Assignment",
      input.showResponseBodyInConsole
    );
    Object.assign(generateTasksInAssignmentActionResponse, json);
    return generateTasksInAssignmentActionResponse;
  }
}
module.exports = GenerateTasksInAssignmentAction;
