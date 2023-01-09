export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const TaskListResponse = require("../transferObj/TaskListResponse");
var contextPath = "/ispw/{srid}/sets/{setId}/tasks";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
}

class GetSetTaskListAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let getSetTaskListActionResponse: IspwResponse = new TaskListResponse();
    let util = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doGetRequest(
      url,
      input.cesToken,
      "Get Set Task List",
      input.showResponseBodyInConsole
    );
    Object.assign(getSetTaskListActionResponse, json);
    return getSetTaskListActionResponse;
  }  
}
module.exports = GetSetTaskListAction;
