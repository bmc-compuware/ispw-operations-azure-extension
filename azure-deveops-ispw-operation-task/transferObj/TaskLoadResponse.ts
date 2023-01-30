class TaskLoadResponse implements IspwResponse {
  taskId: string = "";
  message: string = "";
  url: string = "";

  constructor() {}
}

module.exports = TaskLoadResponse;
