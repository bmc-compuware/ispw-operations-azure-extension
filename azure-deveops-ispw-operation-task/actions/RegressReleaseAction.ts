export {};
const TaskResponse = require("../transferObj/TaskResponse");
var contextPath =
  "/ispw/{srid}/releases/{releaseId}/tasks/regress?level={level}&mname={mname}&mtype={mtype}";
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const IspwActions = require("../actions/IspwActions");

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

class RegressReleaseAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let rs: IspwResponse = new TaskResponse();
    let restUtilObj = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let reqTO: IspwReqTO = restUtilObj.getIspwReqTo(
      input,
      contextPath,
      reqBody
    );
    let url = restUtilObj.getCesUrl(input) + reqTO.path;
    let cmnService = new CommonService();
    let json = await cmnService.doPostRequest(
      url,
      input.host,
      input.port,
      reqTO.reqBody,
      input.authType,
      input.cesToken,
      input.certificate,
      input.key,
      "Regress Release",
      input.showResponseBodyInConsole,
      input.trustAllCerts
    );
    Object.assign(rs, json);
    return rs;
  }
}
module.exports = RegressReleaseAction;
