export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const ReleaseInfo = require("../transferObj/ReleaseInfo");
var contextPath = "/ispw/{srid}/releases/{releaseId}?rtConfig={rtConfig}";
class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
}

class GetReleaseInfoAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let getReleaseInfoActionResponse: IspwResponse = new ReleaseInfo();
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
      "Get Release Info",
      input.showResponseBodyInConsole,
      input.trustAllCerts
    );
    Object.assign(getReleaseInfoActionResponse, json);
    return getReleaseInfoActionResponse;
  }  
}
module.exports = GetReleaseInfoAction;
