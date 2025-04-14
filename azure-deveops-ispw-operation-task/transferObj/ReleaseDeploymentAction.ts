class ReleaseDeploymentAction implements IspwResponse {
  id: string = "";
  deployments: DeploymentResponse[] = new Array()

  constructor() {}
}

module.exports = ReleaseDeploymentAction;
