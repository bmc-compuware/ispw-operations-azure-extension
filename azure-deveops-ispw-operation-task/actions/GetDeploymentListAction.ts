export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const DeploymentListResponse = require("../transferObj/DeploymentListResponse");
var contextPath = "/ispw/{srid}/deployments?todaysDate={todaysDate}&priorWeek={priorWeek}&startDate={startDate}&endDate={endDate}&requestId={requestId}&setId={setId}&environment={environment}&status={status}";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
}

class GetDeploymentListAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let deploymentListResponseActionResponse: IspwResponse = new DeploymentListResponse();
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
      "Get Deployment List",
      input.showResponseBodyInConsole,
      input.trustAllCerts
    );
    Object.assign(deploymentListResponseActionResponse, json);
    return deploymentListResponseActionResponse;
  }  
}
module.exports = GetDeploymentListAction;