export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const TaskInfo = require("../transferObj/TaskInfo");
var contextPath = "/ispw/{srid}/releases/{releaseId}/tasks/{taskId}";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
}

class GetReleaseTaskInfoAction extends IspwActions {
  async performAction(input: Input): Promise<TaskInfo> {
    let getReleaseTaskInfoActionResponse: TaskInfo = new TaskInfo();
    let util = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doGetRequest(
      url,
      input.cesToken,
      "Get Release Task Info",
      input.showResponseBodyInConsole
    );
    Object.assign(getReleaseTaskInfoActionResponse, json);
    return getReleaseTaskInfoActionResponse;
  }  
}
module.exports = GetReleaseTaskInfoAction;
