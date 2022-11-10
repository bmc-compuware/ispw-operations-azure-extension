export { };
const TaskResponse = require('../transferObj/TaskResponse')
var contextPath = "/ispw/{srid}/assignments/{assignmentId}/tasks/regress?level={level}&mname={mname}&mtype={mtype}";
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

class RegressAssignmentAction extends IspwActions {
    async performAction(input: Input): Promise<IspwResponse> {
        let rs: IspwResponse = new TaskResponse();
        let restUtilObj = new restUtis();
        let reqBody = new ReqBodyAttributes();
        let reqTO: IspwReqTO = restUtilObj.getIspwReqTo(input, contextPath, reqBody);
        let url = restUtilObj.getCesUrl(input) + reqTO.path;
        let cmnService = new CommonService();
        let json = await cmnService.doPostRequest(url, reqTO.reqBody, input.cesToken, "Regress Assignment", input.showResponseBodyInConsole);
        Object.assign(rs, json);
        return rs;
    }
}

module.exports = RegressAssignmentAction;