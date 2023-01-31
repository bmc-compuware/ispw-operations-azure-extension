export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const MultiTaskInfoResponse = require("../transferObj/MultiTaskInfoResponse");
var contextPath = "/ispw/{srid}/assignments/{assignmentId}/tasks/transfer?level={level}&mname={mname}&mtype={mtype}&taskId={taskId}";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
  runtimeConfiguration: string = "";
  containerId: string = "";
  containerType: string = "";  
}

class TransferTaskAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let transferTaskActionResponse: IspwResponse = new MultiTaskInfoResponse();
    let util = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doPostRequest(
      url,
      reqTO.reqBody,
      input.cesToken,
      "Transfer Task",
      input.showResponseBodyInConsole
    );
    Object.assign(transferTaskActionResponse, json);
    return transferTaskActionResponse;
  }
}
module.exports = TransferTaskAction;
