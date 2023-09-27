const addTaskResponse = require("../transferObj/AddTaskResponse");
const assignmentResponse = require("../transferObj/AssignmentResponse");
const deploymentResponse = require("../transferObj/DeploymentResponse");
const releaseResponse = require("../transferObj/ReleaseResponse");
const assignmentInfo = require("../transferObj/AssignmentInfo");
const taskListResponse = require("../transferObj/TaskListResponse");
const taskInfo = require("../transferObj/TaskInfo");
const setInfoResponse = require("../transferObj/SetInfoResponse");
const containerListResponse = require("../transferObj/ContainerListResponse");
const containerListInfo = require("../transferObj/ContainerListInfo");
const releaseInfo = require("../transferObj/ReleaseInfo");
const taskListingResponse = require("../transferObj/TaskListingResponse");
const deploymentListResponse = require("../transferObj/DeploymentListResponse");
const workListResponse = require("../transferObj/WorkListResponse");
const multiTaskInfoResponse = require("../transferObj/MultiTaskInfoResponse");
const taskResponse = require("../transferObj/TaskResponse");
const taskLoadResponse = require("../transferObj/TaskLoadResponse");

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
        console.log("WORK REQ.: " + respObject.refNumber);
        console.log("Release: " + respObject.releaseId);
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

    if (respObject instanceof containerListResponse) {
      if (action == "GetContainerList") {
        for (let i = 0; i < respObject.containers.length; i++) {
          console.log("\nApplication: " + respObject.containers[i].application);
          if (respObject.containers[i].subAppl) {
            console.log("SubAppl: " + respObject.containers[i].subAppl);
          }
          console.log("Container ID: " + respObject.containers[i].containerId);
          console.log(
            "Container type: " + respObject.containers[i].containerType
          );
          console.log("Description: " + respObject.containers[i].description);
          console.log("Owner: " + respObject.containers[i].owner);
          console.log("Path: " + respObject.containers[i].path);
          console.log("WORK REQ: " + respObject.containers[i].refNumber);
          console.log("Release ID: " + respObject.containers[i].releaseId);
          console.log("Stream: " + respObject.containers[i].stream);
        }
      }
    }

    if (respObject instanceof releaseInfo) {
      if (action == "GetReleaseInfo") {
        if (respObject.subAppl) {
          console.log(
            "Stream/Application/SubAppl: " +
              respObject.stream +
              "/" +
              respObject.application +
              "/" +
              respObject.subAppl
          );
        } else {
          console.log(
            "Stream/Application: " +
              respObject.stream +
              "/" +
              respObject.application
          );
        }
        console.log(
          "Release: " + respObject.releaseId + " - " + respObject.description
        );
        console.log("Owner: " + respObject.owner);
        console.log("WORK REQ. : " + respObject.referenceNumber);
        console.log("Release prefix: " + respObject.releasePrefix);
      }
    }

    if (respObject instanceof taskListingResponse) {
      if (action == "GetReleaseTaskGenerateListing") {
        console.log("Listing : \n" + respObject.listing);
      }
    }

    if (respObject instanceof deploymentListResponse) 
    {
      if (action == "GetDeploymentList") 
      {
        for (let i = 0; i < respObject.deploymentListItems.length; i++) 
        {
          console.log(" ");
          console.log("Request Id: " + respObject.deploymentListItems[i].requestId);
          console.log(
            "Set: " + respObject.deploymentListItems[i].setId
          );
          console.log(
            "Environment: " + respObject.deploymentListItems[i].environment
          );
          console.log(
            "Status: " + respObject.deploymentListItems[i].status
          );
          console.log("Description: " + respObject.deploymentListItems[i].description);
          console.log("Create Date/Time: " + respObject.deploymentListItems[i].createDateTime);
        }
      }
    }

    if (respObject instanceof workListResponse) {
      if (action == "GetWorkList") {
        for (let i = 0; i < respObject.workListItems.length; i++) {
          console.log(" ");
          console.log("Action: " + respObject.workListItems[i].action);
          console.log(
            "Alternate Name: " + respObject.workListItems[i].alternateName
          );
          console.log(
            "Application: " + respObject.workListItems[i].application
          );
          if (respObject.workListItems[i].subAppl) {
            console.log("SubAppl: " + respObject.workListItems[i].subAppl);
          }
          console.log(
            "Assignment ID: " + respObject.workListItems[i].assignmentId
          );
          console.log("Clazz: " + respObject.workListItems[i].clazz);
          console.log("Date/Time: " + respObject.workListItems[i].dateTime);
          console.log(
            "Environment: " + respObject.workListItems[i].environment
          );
          console.log("Group: " + respObject.workListItems[i].group);
          console.log("Level: " + respObject.workListItems[i].level);
          console.log("Message: " + respObject.workListItems[i].message);
          console.log("Name: " + respObject.workListItems[i].name);
          console.log("Operation: " + respObject.workListItems[i].operation);
          console.log("Owner: " + respObject.workListItems[i].owner);
          console.log("Path: " + respObject.workListItems[i].path);
          console.log("WORK REQ.: " + respObject.workListItems[i].refNumber);
          console.log(
            "Relative Path: " + respObject.workListItems[i].relativePath
          );
          console.log("Release ID: " + respObject.workListItems[i].releaseId);
          console.log("Stream: " + respObject.workListItems[i].stream);
          console.log("Task ID: " + respObject.workListItems[i].taskId);
          console.log("Technology: " + respObject.workListItems[i].technology);
          console.log("Type: " + respObject.workListItems[i].type);
          console.log("User: " + respObject.workListItems[i].user);
          console.log("Version: " + respObject.workListItems[i].version);
        }
      }
    }

    if (respObject instanceof multiTaskInfoResponse) {
      if (action == "RemoveFromRelease") {
        console.log(respObject.message);
      }
      if (action == "TransferTask") {
        console.log(respObject.message);
      }

    }

    if (respObject instanceof taskResponse) {
      if (action == "SetOperation") {
        console.log("Completed operation on set " + respObject.setId);
      }
    }

    if (respObject instanceof taskLoadResponse) {
      if (action == "TaskLoad" && respObject.taskId) {
        console.log("Task with ID "+respObject.taskId+" loaded to assignment "+ respObject.url.split("/").reverse()[2]);
      }
    }

}
}

module.exports = SummarizeResponse;
