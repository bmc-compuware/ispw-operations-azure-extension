export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
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
  changeType: string = "";
  executionStatus: string = "";
  dpenvlst: string = "";
  system: string = "";
  autoDeploy: string = "";
  deployActiveDate: string = "";
  deployActiveTime: string = "";
  deployImplementationDate: string = "";
  deployImplementationTime: string = "";
  override: string = "";
  // taskId: string[] = [];
}

class GenerateTaskAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let generateTaskActionResponse: IspwResponse =
      new TaskResponse();
    let util = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO;

    if(input.buildAutomatically == true)
    {
      reqTO = util.getIspwReqToForBuildAutomatically(input, contextPath, reqBody);
    }else
    {
      reqTO = util.getIspwReqTo(input, contextPath, reqBody);
    }
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doPostRequest(
      url,
      input.host,
      input.port,
      reqTO.reqBody,
      input.authType,
      input.cesToken,
      input.certificate,
      input.key,
      "Generate Task",
      input.showResponseBodyInConsole,
      input.trustAllCerts
    );
    Object.assign(generateTaskActionResponse, json);
    return generateTaskActionResponse;
  }
}
module.exports = GenerateTaskAction;
