export {};
const IspwActions = require("./IspwActions");
const restUtis = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const BuildResponse = require("../transferObj/BuildResponse");
var contextPath =
  "/ispw/{srid}/assignments/{assignmentId}/tasks/build?level={level}&mname={mname}&mtype={mtype}";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
  runtimeConfiguration: string = "";
}

class BuildAssignmentAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let buildAssignmentActionResponse: IspwResponse =
      new BuildResponse();
    let util = new restUtis();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doPostRequest(
      url,
      reqTO.reqBody,
      input.cesToken,
      "Build Assignment",
      input.showResponseBodyInConsole
    );
    Object.assign(buildAssignmentActionResponse, json);
    return buildAssignmentActionResponse;
  }
}
module.exports = BuildAssignmentAction;
