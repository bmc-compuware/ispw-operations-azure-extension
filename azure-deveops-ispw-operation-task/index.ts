import tl = require('azure-pipelines-task-lib/task');
const PromoteAction = require('./actions/PromoteAssignmentAction');
const IspwActions = require('./actions/IspwActions');
const SetInfoAction = require('./actions/SetInfoAction');
const ActionFactory = require('./actions/ActionFactory');
const Input = require('./transferObj/input')
const SetIdResponse = require('./transferObj/SetIdResponse')
const IspwResponse = require('./transferObj/ispwResponse');
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
    return (!str || str.length === 0);
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    const connectionId: string | undefined = tl.getInput('connectionId', true); // 
    const cesUrl: string | undefined = tl.getInput('cesUrl', true);////
    const action: any | undefined = tl.getInput("action", true);//"PromoteAction" //
    const payload: string | undefined = tl.getInput("request",true);//"assignmentId=paly0122"; //
    const cesToken: string | undefined =tl.getInput('cesSecretToken'); //"a7c35910-8775-4ba7-8b94-ad6822f9296c"//
    const skipWaitingForSetCompletion: boolean | undefined = tl.getBoolInput("skipWaitingForSetCompletion") ;
    const showResponseBodyInConsole : boolean | undefined =tl.getBoolInput("showResponseBodyInConsole");
    var isValidInput: boolean = connectionId != undefined && cesUrl != undefined &&
        action != undefined && !isEmpty(connectionId) && !isEmpty(cesUrl);
    var ispwActions: IspwActions;
    if (isValidInput) {
        let connection = connectionId != undefined ? connectionId.split('#') : "";
        let codePage = connection[1].trim();
        let conStr = connection[0];
        let hostPortArr = conStr.split(":");
        let actionFactory = new ActionFactory();
        if (!isEmpty(action)) {
            ispwActions = actionFactory.createObj(action);
            let input = new Input(hostPortArr[0], hostPortArr[1], codePage, cesUrl, payload, cesToken,skipWaitingForSetCompletion,showResponseBodyInConsole);
            const obj = await ispwActions.performAction(input);
            if (!skipWaitingForSetCompletion) {
                if (obj instanceof SetIdResponse) {
                    let obj1 = obj as SetIdResponse;
                    if (obj1.setId != undefined) {
                        input = new Input(hostPortArr[0], hostPortArr[1], codePage, obj1.url, {}, cesToken,skipWaitingForSetCompletion,showResponseBodyInConsole)
                        ispwActions = actionFactory.createObj("SetInfo");
                        let i: number = 0;
                        for (; i < 60; i++) {
                            await sleep(polling_interval);
                            const setResponse: IspwResponse = await ispwActions.performAction(input);
                            let set_obj = setResponse as SetInfoResponse;
                            console.log("waiting for set to complete");
                            if (set_obj.state == SET_STATE_FAILED) {
                                console.log("ISPW: Set " + set_obj.setid + " - action [%s] failed", action);
                                break;
                            } else if (set_obj.state == SET_STATE_TERMINATED) {
                                console.log("ISPW: Set " + set_obj.setid + " - successfully terminated");
                                break;
                            } else if (set_obj.state == SET_STATE_HELD) {
                                console.log("ISPW: Set " + set_obj.setid + " - successfully held");
                                break;
                            } else if (set_obj.state == SET_STATE_RELEASED || set_obj.state == SET_STATE_WAITING_LOCK) {
                                console.log("ISPW: Set " + set_obj.setid + " - successfully released");
                                break;
                            } else if (set_obj.state == SET_STATE_CLOSED || set_obj.state == SET_STATE_COMPLETE
                                || set_obj.state == SET_STATE_WAITING_APPROVAL) {
                                console.log("ISPW: Action " + action + " completed");
                                break;
                            }
                            if (i == 60) {
                                console.log("max time out reached");
                            }

                        }

                    }
                }

            }



        }
    }
}

run();