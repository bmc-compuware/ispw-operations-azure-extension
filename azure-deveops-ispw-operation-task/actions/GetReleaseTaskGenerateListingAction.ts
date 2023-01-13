export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const TaskListingResponse = require("../transferObj/TaskListingResponse");
var contextPath = "/ispw/{srid}/releases/{releaseId}/tasks/{taskId}/listing";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
}

class GetReleaseTaskGenerateListingAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let getReleaseTaskGenerateListingActionResponse: IspwResponse = new TaskListingResponse();
    let util = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doGetRequest(
      url,
      input.cesToken,
      "Get Release Task Generate Listing",
      input.showResponseBodyInConsole
    );
    Object.assign(getReleaseTaskGenerateListingActionResponse, json);
    return getReleaseTaskGenerateListingActionResponse;
  }  
}
module.exports = GetReleaseTaskGenerateListingAction;
