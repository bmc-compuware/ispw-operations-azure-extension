export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const AssignmentResponse = require("../transferObj/AssignmentResponse");
var contextPath = "/ispw/{srid}/assignments/{assignmentId}/cancel";

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

class CancelAssignmentAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let cancelAssignmentActionResponse: IspwResponse = new AssignmentResponse();
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
      "Cancel Assignment",
      input.showResponseBodyInConsole,
      input.trustAllCerts
    );
    Object.assign(cancelAssignmentActionResponse, json);
    return cancelAssignmentActionResponse;
  }  
}
module.exports = CancelAssignmentAction;
