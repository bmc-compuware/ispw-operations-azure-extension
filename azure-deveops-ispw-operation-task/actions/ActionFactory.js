"use strict";
const PromoteAssignmentAction = require('./PromoteAssignmentAction');
const setInfoAction = require('./SetInfoAction');
const promoteReleaseAction = require('./PromoteReleaseAction');
const regressAssignmentAction = require('./RegressAssignmentAction');
const regressReleaseAction = require('./RegressReleaseAction');
class ActionFactory {
    constructor() {
    }
    createObj(type) {
        switch (type) {
            case 'PromoteAssignment': return new PromoteAssignmentAction();
            case 'SetInfo': return new setInfoAction();
            case 'PromoteRelease': return new promoteReleaseAction();
            case 'RegressAssignment': return new regressAssignmentAction();
            case 'RegressRelease': return new regressReleaseAction();
            default: new Error('Action Not supported');
        }
    }
}
module.exports = ActionFactory;
