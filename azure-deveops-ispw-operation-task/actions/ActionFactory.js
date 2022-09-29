"use strict";
const PromoteAssignmentAction = require('./PromoteAssignmentAction');
class ActionFactory {
    constructor() {
    }
    createObj(type) {
        switch (type) {
            case 'PromoteAssignment': return new PromoteAssignmentAction();
            default: new Error('Action Not supported');
        }
    }
}
module.exports = ActionFactory;
