const PromoteAssignmentAction = require('./PromoteAssignmentAction');
const setInfoAction = require('./SetInfoAction');
class ActionFactory {
    constructor(){
        
    }
    createObj(type: string) {
           switch (type) {
                case 'PromoteAssignment': return new PromoteAssignmentAction();
                case 'SetInfo': return  new setInfoAction();
                default: new Error('Action Not supported');

        }

    }
}
module.exports = ActionFactory;
