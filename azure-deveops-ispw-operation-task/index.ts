import tl = require('azure-pipelines-task-lib/task');
const PromoteAction = require('./actions/PromoteAction');
const IspwActions = require('./actions/IspwActions');
const ActionFactory = require('./actions/ActionFactory');
const Input= require('./transferObj/input')

function isEmpty(str: string) {
    return (!str || str.length === 0);
}

function isUrlValid(userInput: string) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (res == null)
        return false;
    else
        return true
}



async function run() {
    const connectionId: string | undefined = tl.getInput('connectionId', true); //"cw09.compuware.com:47623#1047" 
    const cesUrl: string | undefined = tl.getInput('cesUrl', true);//"http://localhost:48080"//
    const action: any | undefined = tl.getInput("action", true);//"PromoteAction" //
    const payload: string | undefined =tl.getInput("request",true);//"assignmentId=paly0122"; //
    const cesToekn :string|undefined= tl.getInput('cesSecretToken'); //"a7c35910-8775-4ba7-8b94-ad6822f9296c"//
    
    var isValidInput: boolean = connectionId != undefined && cesUrl != undefined && 
    action != undefined && !isEmpty(connectionId) && !isEmpty(cesUrl);
    var ispwActions: IspwActions;
    if (isValidInput) {
        let connection = connectionId !=undefined ? connectionId.split('#'):"";
        let codePage = connection[1].trim();
        let conStr = connection[0];
        let hostPortArr = conStr.split(":");
        let actionFactory = new ActionFactory();
        if (!isEmpty(action)) {
            ispwActions = actionFactory.createObj(action);
            let input = new Input(hostPortArr[0],hostPortArr[1],codePage,cesUrl,payload,cesToekn);
            ispwActions.performAction(input);
        }
    }
}

run();