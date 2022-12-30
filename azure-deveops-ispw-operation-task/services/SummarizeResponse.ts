const addTaskResponse = require("../transferObj/AddTaskResponse");
const assignmentResponse = require("../transferObj/AssignmentResponse");
const deploymentResponse = require("../transferObj/DeploymentResponse");
const releaseResponse = require("../transferObj/ReleaseResponse");
const assignmentInfo = require("../transferObj/AssignmentInfo");
const taskListResponse = require("../transferObj/TaskListResponse");
const taskInfo = require("../transferObj/TaskInfo");
const setInfoResponse = require("../transferObj/SetInfoResponse");

class SummarizeResponse {
  summarize(respObject: any, action: string): void {
    if (respObject instanceof addTaskResponse) {
      if (respObject.setId) {
        console.log(respObject.message);
      }
    }
    if (respObject instanceof assignmentResponse) {
      if (action == "CreateAssignment") {
        console.log("Created Assignment " + respObject.assignmentId + ".");
      }
      if (action == "CancelAssignment") {
        console.log(
          "Cancel assignment " + respObject.assignmentId + " is submitted. "
        );
      }
      if (action == "CloseAssignment") {
        console.log(
          "Close assignment " + respObject.assignmentId + " is submitted. "
        );
      }
    }
    if (respObject instanceof releaseResponse) {
      if (action == "CreateRelease") {
        console.log("Created Release " + respObject.releaseId + ".");
      }
      if (action == "CancelRelease") {
        console.log(
          "Cancel release " + respObject.releaseId + " is submitted. "
        );
      }
      if (action == "CloseRelease") {
        console.log(
          "Close release " + respObject.releaseId + " is submitted. "
        );
      }
    }
    if (respObject instanceof deploymentResponse) {
      console.log(
        "Job to cancel deployment with the request ID " +
          respObject.requestId +
          " is submitted. "
      );
    }
    if (respObject instanceof assignmentInfo) {
      if (action == "GetAssignmentInfo") {
        console.log(
          "Stream/Application/Default path: " +
            respObject.stream +
            "/" +
            respObject.application +
            "/" +
            respObject.defaultPath
        );
        if (respObject.subAppl) {
          console.log("SubAppl: " + respObject.subAppl);
        }
        console.log(
          "Assignment: " +
            respObject.assignmentId +
            " - " +
            respObject.description
        );
        console.log("Owner: " + respObject.owner);
        console.log("Reference number: " + respObject.ref);
        console.log("Release: " + respObject.releaseId);
        console.log("User tag: " + respObject.userTag);
      }
    }
    if (respObject instanceof taskListResponse) {
      if (
        action == "GetAssignmentTaskList" ||
        action == "GetReleaseTaskList" ||
        action == "GetSetTaskList"
      ) {
        console.log(
          "TaskId, Module, Type, UserId, Version, Status, Application/SubAppl/Stream/Level, Release"
        );
        for (let i = 0; i < respObject.tasks.length; i++) {
          console.log(
            respObject.tasks[i].taskId +
              "," +
              respObject.tasks[i].moduleName +
              "," +
              respObject.tasks[i].moduleType +
              "," +
              respObject.tasks[i].userId +
              "," +
              respObject.tasks[i].version +
              "," +
              respObject.tasks[i].status +
              "," +
              respObject.tasks[i].application +
              "/" +
              respObject.tasks[i].subAppl +
              "/" +
              respObject.tasks[i].stream +
              "/" +
              respObject.tasks[i].level +
              "," +
              respObject.tasks[i].release
          );
        }
      }
    }
    if (respObject instanceof taskInfo) {
      if (action == "GetReleaseTaskInfo") {
        console.log(
          "TaskId, Module, Type, UserId, Version, Status, Application/SubAppl/Stream/Level, Release"
        );
        console.log(
          respObject.taskId +
            "," +
            respObject.moduleName +
            "," +
            respObject.moduleType +
            "," +
            respObject.userId +
            "," +
            respObject.version +
            "," +
            respObject.status +
            "," +
            respObject.application +
            "/" +
            respObject.subAppl +
            "/" +
            respObject.stream +
            "/" +
            respObject.level +
            "," +
            respObject.release
        );
      }
    }
    if (respObject instanceof setInfoResponse) {
      if (action == "GetSetInfo") {
        console.log(
          "SetId, State, Owner, Application/subAppl/Stream, Start Date/Start Time"
        );
        console.log(
          respObject.setid +
            "," +
            respObject.state +
            "," +
            respObject.owner +
            "," +
            respObject.applicationId +
            "/" +
            respObject.subAppl +
            "/" +
            respObject.streamName +
            "," +
            respObject.startDate +
            "/" +
            respObject.startTime
        );
      }
    }
  }
}

module.exports = SummarizeResponse;
