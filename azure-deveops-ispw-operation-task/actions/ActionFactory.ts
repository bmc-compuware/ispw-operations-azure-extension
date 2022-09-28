const PromoteAction = require('./PromoteAction');
class ActionFactory {
    constructor(){
        
    }
    createObj(type: string) {
           switch (type) {
                case 'PromoteAssignment': return new PromoteAction();
                default: new Error('Action Not supported');

        }

    }
}
module.exports = ActionFactory;
