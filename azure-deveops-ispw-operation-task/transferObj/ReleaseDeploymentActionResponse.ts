class ReleaseDeploymentActionResponse implements IspwResponse {
  message: string = "";
  releaseId: string = "";
  sets: ReleaseDeploymentAction[] = new Array();

  constructor() {}
}

module.exports = ReleaseDeploymentActionResponse;
