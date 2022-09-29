class IspwReqTO {
    application: string = "";
    srid: string = "";
    assignmentId: string = ""
    releaseId: string = "";
    requestId: string = "";
    setId: string = "";
    level: string = "";
    taskId: string = "";
    mname: string = "";
    mtype: string = "";
    action: string = "";
    approver: string = "";
    checkout: boolean = false;
    path: string="";
    reqBody:any={};
}
module.exports= IspwReqTO;