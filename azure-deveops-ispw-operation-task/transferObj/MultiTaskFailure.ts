class MultiTaskFailure implements IspwResponse {
  mname: string = "";
  mtype: string = "";
  taskId: string = "";
  errorMessage: string = "";

  constructor() {}
}

module.exports = MultiTaskFailure;
