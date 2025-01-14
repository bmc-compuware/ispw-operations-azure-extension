export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const AssignmentInfo = require("../transferObj/AssignmentInfo");
var contextPath = "/ispw/{srid}/assignments/{assignmentId}?rtConfig={rtConfig}";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
}

class GetAssignmentInfoAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let getAssignmentInfoActionResponse: IspwResponse = new AssignmentInfo();
    let util = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doGetRequest(
      url,
      input.host,
      input.port,
      input.authType,
      input.cesToken,
      input.certificate,
      input.key,
      "Get Assignment Info",
      input.showResponseBodyInConsole,
      input.trustAllCerts
    );
    Object.assign(getAssignmentInfoActionResponse, json);
    return getAssignmentInfoActionResponse;
  }  
}
module.exports = GetAssignmentInfoAction;
