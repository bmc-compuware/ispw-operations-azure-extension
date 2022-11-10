"use strict";
class BuildResponse {
    constructor(assignmentId, setId, message, url, taskName) {
        this.assignmentId = assignmentId;
        this.setId = setId;
        this.message = message;
        this.url = url;
        this.tasks = new Array();
        ;
    }
}
module.exports = BuildResponse;
