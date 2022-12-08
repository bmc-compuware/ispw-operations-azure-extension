class ReleaseResponse implements IspwResponse {
  releaseId: string;
  message: string;
  url: string;

  constructor(releaseId: string, message: string, url: string) {
    this.releaseId = releaseId;
    this.message = message;
    this.url = url;
  }
}

module.exports = ReleaseResponse;
