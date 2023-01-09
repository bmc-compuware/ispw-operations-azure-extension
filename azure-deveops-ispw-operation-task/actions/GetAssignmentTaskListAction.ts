export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const TaskListResponse = require("../transferObj/TaskListResponse");
var contextPath = "/ispw/{srid}/assignments/{assignmentId}/tasks?level={level}";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
}

class GetAssignmentTaskListAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let getAssignmentTaskListActionResponse: IspwResponse = new TaskListResponse();
    let util = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doGetRequest(
      url,
      input.cesToken,
      "Get Assignment Task List",
      input.showResponseBodyInConsole
    );
    Object.assign(getAssignmentTaskListActionResponse, json);
    return getAssignmentTaskListActionResponse;
  }  
}
module.exports = GetAssignmentTaskListAction;
