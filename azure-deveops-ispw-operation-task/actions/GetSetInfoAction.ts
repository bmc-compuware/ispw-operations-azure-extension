export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const SetInfoResponse = require("../transferObj/SetInfoResponse");
var contextPath = "/ispw/{srid}/sets/{setId}?level={level}";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
  setId: String = "";
  level: String = "";
}

class GetSetInfoAction extends IspwActions {
  async performAction(input: Input): Promise<SetInfoResponse> {
    let getSetInfoActionResponse: SetInfoResponse = new SetInfoResponse();
    let util = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doGetRequest(
      url,
      input.cesToken,
      "Get Set Info",
      input.showResponseBodyInConsole
    );
    Object.assign(getSetInfoActionResponse, json);
    return getSetInfoActionResponse;
  }  
}
module.exports = GetSetInfoAction;
