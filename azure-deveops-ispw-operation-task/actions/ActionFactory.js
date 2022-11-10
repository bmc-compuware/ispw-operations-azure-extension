"use strict";
const AddTaskAction = require("./AddTaskAction");
const PromoteAssignmentAction = require("./PromoteAssignmentAction");
const setInfoAction = require("./SetInfoAction");
const promoteReleaseAction = require("./PromoteReleaseAction");
const regressAssignmentAction = require("./RegressAssignmentAction");
const regressReleaseAction = require("./RegressReleaseAction");
const generateTasksInAssignmentAction = require("./GenerateTasksInAssignmentAction");
const generateTasksInReleaseAction = require("./GenerateTasksInReleaseAction");
const generateTaskAction = require("./GenerateTaskAction");
class ActionFactory {
    constructor() { }
    createObj(type) {
        switch (type) {
            case "AddTask":
                return new AddTaskAction();
            case "GenerateTasksInAssignment":
                return new generateTasksInAssignmentAction();
            case "GenerateTasksInRelease":
                return new generateTasksInReleaseAction();
            case "GenerateTask":
                return new generateTaskAction();
            case "PromoteAssignment":
                return new PromoteAssignmentAction();
            case "SetInfo":
                return new setInfoAction();
            case "PromoteRelease":
                return new promoteReleaseAction();
            case "RegressAssignment":
                return new regressAssignmentAction();
            case "RegressRelease":
                return new regressReleaseAction();
            default:
                new Error("Action Not supported");
        }
    }
}
module.exports = ActionFactory;
