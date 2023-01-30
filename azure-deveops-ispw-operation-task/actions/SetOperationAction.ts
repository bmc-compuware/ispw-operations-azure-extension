export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const TaskResponse = require("../transferObj/TaskResponse");
var contextPath = "/ispw/{srid}/sets/{setId}/{action}?approver={approver}";

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
  override: string = "";
  taskId: string[] = [];
}

class SetOperationAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let setOperationActionResponse: IspwResponse = new TaskResponse();
    let util = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doPostRequest(
      url,
      reqTO.reqBody,
      input.cesToken,
      "Set Operation",
      input.showResponseBodyInConsole
    );
    Object.assign(setOperationActionResponse, json);
    return setOperationActionResponse;
  }
}
module.exports = SetOperationAction;
