export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const DeploymentResponse = require("../transferObj/DeploymentResponse");
var contextPath = "/ispw/{srid}/deployments/{requestId}/cancel";

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

class CancelDeploymentAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let cancelDeploymentActionResponse: IspwResponse = new DeploymentResponse();
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
      "Cancel Deployment",
      input.showResponseBodyInConsole,
      input.trustAllCerts
    );
    Object.assign(cancelDeploymentActionResponse, json);
    return cancelDeploymentActionResponse;
  }
}
module.exports = CancelDeploymentAction;
