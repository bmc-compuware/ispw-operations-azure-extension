export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const TaskListResponse = require("../transferObj/TaskListResponse");
var contextPath = "/ispw/{srid}/releases/{releaseId}/tasks?level={level}&rtConfig={rtConfig}";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
}

class GetReleaseTaskListAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let getReleaseTaskListActionResponse: IspwResponse = new TaskListResponse();
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
      "Get Release Task List",
      input.showResponseBodyInConsole,
      input.trustAllCerts
    );
    Object.assign(getReleaseTaskListActionResponse, json);
    return getReleaseTaskListActionResponse;
  }  
}
module.exports = GetReleaseTaskListAction;
