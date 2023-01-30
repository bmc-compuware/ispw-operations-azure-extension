export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const TaskLoadResponse = require("../transferObj/TaskLoadResponse");
var contextPath = "/ispw/{srid}/assignments/{assignmentId}/tasks";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
  application: string = "";
  subAppl: string = "";
  stream: string = "";
  moduleType: string = "";
  moduleName: string = "";
  userId: string = "";
  url: string = "";
  taskId: string = "";
  extension: string = "";
  level: string = "";
  operation: string = "";
  action: string = "";
  dateTime: string = "";
  status: string = "";
  message: string = "";
  set: string = "";
  internalVersion: string = "";
  baseVersion: string = "";
  replaceVersion: string = "";
  environment: string = "";
  clazz: string = "";
  version: string = "";
  alternateName: string = "";
  release: string = "";
  container: string = "";
  flags: string = "";
  currentLevel: string = "";
  startingLevel: string = "";
  generateSequence: string = "";
  option1: string = "";
  option2: string = "";
  option3: string = "";
  option4: string = "";
  option5: string = "";
  assignmentId: string = "";
  genstat: string = "";
  sql: boolean = false;
  ims: boolean = false;
  cics: boolean = false;
  program: boolean = false;
}

class TaskLoadAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let taskLoadActionResponse: IspwResponse = new TaskLoadResponse();
    let util = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doPostRequest(
      url,
      reqTO.reqBody,
      input.cesToken,
      "Task Load",
      input.showResponseBodyInConsole
    );
    Object.assign(taskLoadActionResponse, json);
    return taskLoadActionResponse;
  }
}
module.exports = TaskLoadAction;
