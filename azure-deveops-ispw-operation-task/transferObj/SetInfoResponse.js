"use strict";
class SetInfoResponse {
    constructor() {
        this.setid = "";
        this.applicationId = "";
        this.streamName = "";
        this.description = "";
        this.owner = "";
        this.startDate = "";
        this.startTime = "";
        this.deployImplementationDate = "";
        this.deployImplementationTime = "";
        this.deployActiveDate = "";
        this.deployActiveTime = "";
        this.message = "";
        this.state = "";
        this.tasks = new Array();
    }
}
module.exports = SetInfoResponse;
