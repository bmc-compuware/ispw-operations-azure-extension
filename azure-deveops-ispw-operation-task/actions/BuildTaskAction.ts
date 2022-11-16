export {};
const IspwActions = require("./IspwActions");
const restUtis = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const BuildResponse = require("../transferObj/BuildResponse");
var contextPath =
  "/ispw/{srid}/build?taskId={taskId}&application={application}&subAppl={subAppl}&level={level}&mname={mname}&mtype={mtype}&assignmentId={assignmentId}";

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

class BuildTaskAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let buildTaskActionResponse: IspwResponse = new BuildResponse();
    let util = new restUtis();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doPostRequest(
      url,
      reqTO.reqBody,
      input.cesToken,
      "Build Task",
      input.showResponseBodyInConsole
    );
    Object.assign(buildTaskActionResponse, json);
    return buildTaskActionResponse;
  }
}
module.exports = BuildTaskAction;
