export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const WorkListResponse = require("../transferObj/WorkListResponse");
var contextPath = "/ispw/{srid}/worklist?inProgress={inProgress}&production={production}&historical={historical}&startDate={startDate}&endDate={endDate}&type={type}&name={name}&operation={operation}&level={level}&environment={environment}&application={application}&subAppl={subAppl}&stream={stream}&lastUpdatedBy={lastUpdatedBy}&owner={owner}&releaseId={releaseId}&refNumber={refNumber}&group={group}";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
}

class GetWorkListAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let workListResponseActionResponse: IspwResponse = new WorkListResponse();
    let util = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;

    let json = await cmnService.doGetRequest(
      url,
      input.cesToken,
      "Get Work List",
      input.showResponseBodyInConsole
    );
    Object.assign(workListResponseActionResponse, json);
    return workListResponseActionResponse;
  }  
}
module.exports = GetWorkListAction;
