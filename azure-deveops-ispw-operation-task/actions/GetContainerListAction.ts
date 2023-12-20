export {};
const IspwActions = require("./IspwActions");
const RestUtils = require("../utils/RestUtils");
const CommonService = require("../services/CommonService");
const IspwReqBody = require("../transferObj/IspwReqBody");
const ContainerListResponse = require("../transferObj/ContainerListResponse");
var contextPath = "/ispw/{srid}/containers/list?userId={userId}&containerId={containerId}&containerType={containerType}&application={application}&subAppl={subAppl}&owner={owner}&description={description}&refNumber={refNumber}&releaseId={releaseId}&stream={stream}&path={path}&tag={tag}&includeClosedContainers={includeClosedContainers}";

class ReqBodyAttributes extends IspwReqBody {
  constructor() {
    super();
  }
}

class GetContainerListAction extends IspwActions {
  async performAction(input: Input): Promise<IspwResponse> {
    let getContainerListActionResponse: IspwResponse = new ContainerListResponse();
    let util = new RestUtils();
    let reqBody = new ReqBodyAttributes();
    let cmnService = new CommonService();
    let reqTO: IspwReqTO = util.getIspwReqTo(input, contextPath, reqBody);
    let url = util.getCesUrl(input) + reqTO.path;
    let json = await cmnService.doGetRequest(
      url,
      input.host,
      input.port,
      input.authType,
      input.cesToken,
      input.certificate,
      input.key,
      "Get Container List",
      input.showResponseBodyInConsole,
      input.trustAllCerts
    );
    Object.assign(getContainerListActionResponse, json);
    return getContainerListActionResponse;
  }  
}
module.exports = GetContainerListAction;
