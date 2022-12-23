export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const ReleaseResponse = require("../transferObj/ReleaseResponse");
var contextPath = "/ispw/{srid}/releases";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
  application: String = "";
  stream: String = "";
  description: String = "";
  releaseId: String = "";
  subAppl: String = "";
  owner: String = "";
  releasePrefix: String = "";
  referenceNumber: String = "";
  userTag: String = "";
  message: String = "";
}

class CreateReleaseAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let createReleaseActionResponse: IspwResponse = new ReleaseResponse();
    let util = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doPostRequest(
      url,
      reqTO.reqBody,
      input.cesToken,
      "Create Release",
      input.showResponseBodyInConsole
    );
    Object.assign(createReleaseActionResponse, json);
    return createReleaseActionResponse;
  }
}
module.exports = CreateReleaseAction;
