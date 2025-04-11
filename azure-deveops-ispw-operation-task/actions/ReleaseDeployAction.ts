export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const ReleaseDeploymentActionResponse = require("../transferObj/ReleaseDeploymentActionResponse");
var contextPath =
  "/ispw/{srid}/releases/{releaseId}/deployments/{action}";

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
  taskId: string[] = [];
}

class ReleaseDeployAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let releaseDeployActionResponse: IspwResponse = new ReleaseDeploymentActionResponse();
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
      "Release Deploy Action",
      input.showResponseBodyInConsole,
      input.trustAllCerts
    );
    Object.assign(releaseDeployActionResponse, json);
    return releaseDeployActionResponse;
  }
}
module.exports = ReleaseDeployAction;
