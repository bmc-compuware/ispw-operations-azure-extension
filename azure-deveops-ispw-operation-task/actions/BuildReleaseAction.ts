export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const BuildResponse = require("../transferObj/BuildResponse");
var contextPath =
  "/ispw/{srid}/releases/{releaseId}/tasks/build?level={level}&mname={mname}&mtype={mtype}&assignmentId={assignmentId}";

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
  taskId: string[] = [];
}

class BuildReleaseAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let buildAssignmentActionResponse: IspwResponse = new BuildResponse();
    let util = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO;

    if(input.buildAutomatically == true)
    {
      reqTO = util.getIspwReqToForBuildAutomatically(input, contextPath, reqBody);
    }
    else
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
      "Build Release",
      input.showResponseBodyInConsole,
      input.trustAllCerts
    );
    Object.assign(buildAssignmentActionResponse, json);
    return buildAssignmentActionResponse;
  }
}
module.exports = BuildReleaseAction;
