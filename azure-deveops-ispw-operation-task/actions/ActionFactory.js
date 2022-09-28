"use strict";
const PromoteAction = require('./PromoteAction');
class ActionFactory {
    constructor() {
    }
    createObj(type) {
        switch (type) {
            case 'PromoteAssignment': return new PromoteAction();
            default: new Error('Action Not supported');
        }
    }
}
module.exports = ActionFactory;
