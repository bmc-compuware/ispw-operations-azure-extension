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
const deployAssignmentAction = require("./DeployAssignmentAction");
const deployReleaseAction = require("./DeployReleaseAction");
const deployTaskAction = require("./DeployTaskAction");
const fallbackAssignmentAction = require("./FallbackAssignmentAction");
const fallbackReleaseAction = require("./FallbackReleaseAction");
const cancelAssignmentAction = require("./CancelAssignmentAction");
const cancelDeploymentAction = require("./CancelDeploymentAction");
const cancelReleaseAction = require("./CancelReleaseAction");
const closeAssignmentAction = require("./CloseAssignmentAction");
const closeReleaseAction = require("./CloseReleaseAction");
const createAssignmentAction = require("./CreateAssignmentAction");
const createReleaseAction = require("./CreateReleaseAction");
const getAssignmentInfoAction = require("./GetAssignmentInfoAction");
const getAssignmentTaskListAction = require("./GetAssignmentTaskListAction");
const getReleaseTaskInfoAction = require("./GetReleaseTaskInfoAction");
const getReleaseTaskListAction = require("./GetReleaseTaskListAction");
const getSetInfoAction = require("./GetSetInfoAction");
const getSetTaskListAction = require("./GetSetTaskListAction");
const getContainerListAction = require("./GetContainerListAction");
const getReleaseInfoAction = require("./GetReleaseInfoAction");
const getReleaseTaskGenerateListingAction = require("./GetReleaseTaskGenerateListingAction");

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
      case "CancelAssignment":
        return new cancelAssignmentAction();
      case "CancelDeployment":
        return new cancelDeploymentAction();
      case "CancelRelease":
        return new cancelReleaseAction();
      case "CloseAssignment":
        return new closeAssignmentAction();
      case "CloseRelease":
        return new closeReleaseAction();
      case "CreateAssignment":
        return new createAssignmentAction();
      case "CreateRelease":
        return new createReleaseAction();
      case "DeployAssignment":
        return new deployAssignmentAction();
      case "DeployRelease":
        return new deployReleaseAction();
      case "DeployTask":
        return new deployTaskAction();
      case "FallbackAssignment":
        return new fallbackAssignmentAction();
      case "FallbackRelease":
        return new fallbackReleaseAction();
      case "GenerateTask":
        return new generateTaskAction();
      case "GenerateTasksInAssignment":
        return new generateTasksInAssignmentAction();
      case "GenerateTasksInRelease":
        return new generateTasksInReleaseAction();
      case "GetAssignmentInfo":
        return new getAssignmentInfoAction();
      case "GetAssignmentTaskList":
        return new getAssignmentTaskListAction();
      case "GetContainerList":
        return new getContainerListAction();
      case "GetReleaseInfo":
        return new getReleaseInfoAction();
      case "GetReleaseTaskGenerateListing":
        return new getReleaseTaskGenerateListingAction();
      case "GetReleaseTaskInfo":
        return new getReleaseTaskInfoAction();
      case "GetReleaseTaskList":
        return new getReleaseTaskListAction();
      case "GetSetInfo":
        return new getSetInfoAction();
      case "GetSetTaskList":
        return new getSetTaskListAction();
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
        new Error("Action Not supported!");
    }
  }
}
module.exports = ActionFactory;
