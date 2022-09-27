"use strict";
class IspwReqTO {
    constructor() {
        this.application = "";
        this.srid = "";
        this.assignmentId = "";
        this.releaseId = "";
        this.requestId = "";
        this.setId = "";
        this.level = "";
        this.taskId = "";
        this.mname = "";
        this.mtype = "";
        this.action = "";
        this.approver = "";
        this.checkout = false;
        this.path = "";
    }
}
module.exports = IspwReqTO;
