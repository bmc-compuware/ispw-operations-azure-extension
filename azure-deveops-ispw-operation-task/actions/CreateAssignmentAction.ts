export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const AssignmentResponse = require("../transferObj/AssignmentResponse");
var contextPath = "/ispw/{srid}/assignments";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
  stream: String = "";
  application: String = "";
  defaultPath: String = "";
  description: String = "";
  owner: String = "";
  assignmentPrefix: String = "";
  subAppl: String = "";
  referenceNumber: String = "";
  releaseId: String = "";
  userTag: String = "";
  assignmentId: String = "";
  message: String = "";
  sandboxJoinAtLevel: String="";
}

class CreateAssignmentAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let createAssignmentActionResponse: IspwResponse = new AssignmentResponse();
    let util = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
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
      "Create Assignment",
      input.showResponseBodyInConsole,
      input.trustAllCerts
    );
    Object.assign(createAssignmentActionResponse, json);
    return createAssignmentActionResponse;
  }
}
module.exports = CreateAssignmentAction;
