export {};
const IspwActions = require("./IspwActions");
const restUtis = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const AddTaskResponse = require("../transferObj/AddTaskResponse");
var contextPath =
  "/ispw/{srid}/assignments/{assignmentId}/task/add?checkout={checkout}";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
  action: string = "";
  application: string = "";
  checkoutFromLevel: string = "";
  owner: string = "";
  path: string = "";
  release: string = "";
  runtimeConfiguration: string = "";
  stream: string = "";
  subAppl: string = "";
  taskName: string = "";
  type: string = "";
}

class AddTaskAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let addTaskActionResponse: IspwResponse = new AddTaskResponse();
    let util = new restUtis();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doPostRequest(
      url,
      reqTO.reqBody,
      input.cesToken,
      "Add Task",
      input.showResponseBodyInConsole
    );
    Object.assign(addTaskActionResponse, json);
    return addTaskActionResponse;
  }
}
module.exports = AddTaskAction;
