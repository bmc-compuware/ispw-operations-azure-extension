export { };
const SetIdResponse = require('../transferObj/SetIdResponse')
var contextPath = "/ispw/{srid}/releases/{releaseId}/tasks/promote?level={level}&mname={mname}&mtype={mtype}";
const restUtis = require('../utils/RestUtils')
const CommonService = require('../services/CommonService')
const IspwReqBody = require('../transferObj/IspwReqBody')
const IspwActions = require('../actions/IspwActions')

class ReqBodyAttributes extends IspwReqBody {
    constructor() {
        super();
    }
    runtimeConfiguration: string = "";
}
class PromoteReleaseAction extends IspwActions {
    async performAction(input: Input): Promise<IspwResponse> {
        let prompteActionResponse: IspwResponse = new SetIdResponse();
        let restUtilObj = new restUtis();
        let reqBody = new ReqBodyAttributes();
        let reqTO: IspwReqTO = restUtilObj.getIspwReqTo(input, contextPath, reqBody);
        let url = restUtilObj.getCesUrl(input) + reqTO.path;
        let cmnService = new CommonService();
        let json = await cmnService.doPostRequest(url, reqTO.reqBody, input.cesToken, "Promote Release", input.showResponseBodyInConsole);
        Object.assign(prompteActionResponse, json);
        return prompteActionResponse;

    }
}

module.exports = PromoteReleaseAction;