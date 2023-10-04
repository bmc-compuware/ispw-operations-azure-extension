class DeploymentListResponse implements IspwResponse {
    deploymentListItems: DeploymentListInfo[] = new Array();
    message: string = "";
  
    constructor() {}
  }
  
  module.exports = DeploymentListResponse;