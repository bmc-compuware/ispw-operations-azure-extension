const addTaskAction = require("./AddTaskAction");
const promoteAssignmentAction = require("./PromoteAssignmentAction");
const setInfoAction = require("./SetInfoAction");
const promoteReleaseAction = require("./PromoteReleaseAction");
const regressAssignmentAction = require("./RegressAssignmentAction");
const regressReleaseAction = require("./RegressReleaseAction");
const generateTasksInAssignmentAction = require("./GenerateTasksInAssignmentAction");
const generateTasksInReleaseAction = require("./GenerateTasksInReleaseAction");
const generateTaskAction = require("./GenerateTaskAction");
const buildAssignmentAction = require("./BuildAssignmentAction");
const buildReleaseAction = require("./BuildReleaseAction");
const buildTaskAction = require("./BuildTaskAction");

class ActionFactory {
  constructor() {}
  createObj(type: string) {
    switch (type) {
      case "AddTask":
        return new addTaskAction();
      case "BuildAssignment":
        return new buildAssignmentAction();
      case "BuildRelease":
        return new buildReleaseAction();
      case "BuildTask":
        return new buildTaskAction();
      case "GenerateTasksInAssignment":
        return new generateTasksInAssignmentAction();
      case "GenerateTasksInRelease":
        return new generateTasksInReleaseAction();
      case "GenerateTask":
        return new generateTaskAction();
      case "PromoteAssignment":
        return new promoteAssignmentAction();
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
