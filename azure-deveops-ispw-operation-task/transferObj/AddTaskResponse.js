"use strict";
class AddTaskResponse {
    constructor(message, setId, url, taskName) {
        this.message = message;
        this.setId = setId;
        this.url = url;
        this.taskName = taskName;
    }
}
module.exports = AddTaskResponse;
