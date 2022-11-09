export {};
const IspwActions = require("./IspwActions");
var contextPath =
  "/ispw/{srid}/assignments/{assignmentId}/tasks/promote?level={level}&mname={mname}&mtype={mtype}";
const restUtis = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const SetIdResponse = require("../transferObj/SetIdResponse");
class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
  runtimeConfiguration: string = "";
}

class PromoteAssignmentAction extends IspwActions {
  constructor() {
    super();
  }
  async performAction(input: Input): Promise<IspwResponse> {
    let prompteActionResponse: IspwResponse = new SetIdResponse();
    try {
      let util = new restUtis();
      let authToken = input.cesToken;
      let reqBody = new ReqBodyAttributes();
      let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
      let url = util.getCesUrl(input) + reqTO.path;
      let cmnService = new CommonService();
      let json = await cmnService.doPostRequest(
        url,
        reqTO.reqBody,
        authToken,
        "Promote Assignemnt",
        input.showResponseBodyInConsole
      );
      Object.assign(prompteActionResponse, json);
    } catch (e) {
      console.log((<Error>e).message);
    }
    return prompteActionResponse;
  }
}
module.exports = PromoteAssignmentAction;
