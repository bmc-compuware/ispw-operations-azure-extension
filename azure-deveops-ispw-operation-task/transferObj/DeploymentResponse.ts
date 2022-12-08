class DeploymentResponse implements IspwResponse {
  requestId: string;
  message: string;
  url: string;

  constructor(requestId: string, message: string, url: string) {
    this.requestId = requestId;
    this.message = message;
    this.url = url;
  }
}

module.exports = DeploymentResponse;
