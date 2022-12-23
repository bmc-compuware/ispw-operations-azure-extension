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
      reqTO.reqBody,
      input.cesToken,
      "Create Assignment",
      input.showResponseBodyInConsole
    );
    Object.assign(createAssignmentActionResponse, json);
    return createAssignmentActionResponse;
  }

  endLog(response: Object): void {
    let assignmentResponse = response as AssignmentResponse;
    if (assignmentResponse.assignmentId)
      console.log("Created Assignment " + assignmentResponse.assignmentId+" .");
  }
}
module.exports = CreateAssignmentAction;
