class MultiTaskInfoResponse implements IspwResponse {
  message: string = "";
  url: string = "";
  failedTasks: MultiTaskFailure[] = new Array();

  constructor() {}
}

module.exports = MultiTaskInfoResponse;
