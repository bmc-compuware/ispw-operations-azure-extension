import tl = require("azure-pipelines-task-lib/task");
const ActionFactory = require("./actions/ActionFactory");
const Input = require("./transferObj/input");
const TaskResponse = require("./transferObj/TaskResponse");
const BuildResponse = require("./transferObj/BuildResponse");
const AddTaskResponse = require("./transferObj/AddTaskResponse");
const RestUtils = require("./utils/RestUtils");
const polling_interval: number = 2000;

const SET_STATE_DISPATCHED: string = "Dispatched";
const SET_STATE_EXECUTING = "Executing";
const SET_STATE_COMPLETE = "Complete";
const SET_STATE_CLOSED = "Closed";
const SET_STATE_FAILED = "Failed";
const SET_STATE_HELD = "Held";
const SET_STATE_RELEASED = "Released";
const SET_STATE_TERMINATED = "Terminated";
const SET_STATE_WAITING_APPROVAL = "Waiting-Approval";
const SET_STATE_WAITING_LOCK = "Waiting-Lock";

function isEmpty(str: string) {
  return !str || str.length === 0;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const connectionId: string | undefined = tl.getInput("connectionId", true);
  const cesUrl: string | undefined = tl.getInput("cesUrl", true);
  const action: any | undefined = tl.getInput("action", true);
  const payload: string | undefined = tl.getInput("request", true);
  const cesToken: string | undefined = tl.getInput("cesSecretToken");
  const skipWaitingForSetCompletion: boolean | undefined = tl.getBoolInput(
    "skipWaitingForSetCompletion"
  );
  const showResponseBodyInConsole: boolean | undefined = tl.getBoolInput(
    "showResponseBodyInConsole"
  );
  var isValidInput: boolean =
    connectionId != undefined &&
    cesUrl != undefined &&
    action != undefined &&
    !isEmpty(connectionId) &&
    !isEmpty(cesUrl);
  var ispwActions: IspwActions;
  if (isValidInput) {
    let connection = connectionId != undefined ? connectionId.split("#") : "";
    let codePage = connection[1].trim();
    let conStr = connection[0];
    let hostPortArr = conStr.split(":");
    let actionFactory = new ActionFactory();
    let util = new RestUtils();
    if (!isEmpty(action)) {
      ispwActions = actionFactory.createObj(action);
      let input = new Input(
        hostPortArr[0],
        hostPortArr[1],
        codePage,
        cesUrl,
        payload,
        cesToken,
        skipWaitingForSetCompletion,
        showResponseBodyInConsole
      );
      const respObject = await ispwActions.performAction(input);
      if (respObject instanceof AddTaskResponse) {
        let taskResponse = respObject as AddTaskResponse;
        if(taskResponse.setId){
          console.log(taskResponse.message);
        }
      }
      if (!skipWaitingForSetCompletion) {
        let setId = "";
        let url = "";
        if (respObject instanceof TaskResponse) {
          let taskResp = respObject as TaskResponse;
          setId = taskResp.setId;
          url = taskResp.url;
        } else if (respObject instanceof BuildResponse) {
          let buildResp = respObject as TaskResponse;
          setId = buildResp.setId;
          url = buildResp.url;
        }
        if (
          setId &&
          (respObject instanceof TaskResponse ||
            respObject instanceof BuildResponse)
        ) {
          input = new Input(
            hostPortArr[0],
            hostPortArr[1],
            codePage,
            url,
            {},
            cesToken,
            skipWaitingForSetCompletion,
            showResponseBodyInConsole
          );
          ispwActions = actionFactory.createObj("SetInfo");
          let i: number = 0;
          for (; i < 60; i++) {
            await sleep(polling_interval);
            const setResponse: IspwResponse = await ispwActions.performAction(
              input
            );
            let set_obj = setResponse as SetInfoResponse;
            console.log("Waiting for set to complete...");
            if (set_obj.state == SET_STATE_FAILED) {
              console.log(
                "ISPW: Set " + set_obj.setid + " - action [%s] failed.",
                action
              );
              break;
            } else if (set_obj.state == SET_STATE_TERMINATED) {
              console.log(
                "ISPW: Set " + set_obj.setid + " - successfully terminated."
              );
              break;
            } else if (set_obj.state == SET_STATE_HELD) {
              console.log(
                "ISPW: Set " + set_obj.setid + " - successfully held."
              );
              break;
            } else if (
              set_obj.state == SET_STATE_RELEASED ||
              set_obj.state == SET_STATE_WAITING_LOCK
            ) {
              console.log(
                "ISPW: Set " + set_obj.setid + " - successfully released."
              );
              break;
            } else if (
              set_obj.state == SET_STATE_CLOSED ||
              set_obj.state == SET_STATE_COMPLETE ||
              set_obj.state == SET_STATE_WAITING_APPROVAL
            ) {
              console.log("ISPW: Action " + util.splitPascalCase(action) + " completed.");
              break;
            }
            if (i == 60) {
              console.log("Max time out reached.");
            }
          }
        }
      }
      if (skipWaitingForSetCompletion) {
        console.log(
          "Skip waiting for the completion of the set for this job..."
        );
      }
    }
  }
}

run();
