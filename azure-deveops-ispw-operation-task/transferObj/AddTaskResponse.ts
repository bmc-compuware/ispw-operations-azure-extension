class AddTaskResponse implements IspwResponse {
  message: string;
  setId: string;
  url: string;
  taskName: string;
  constructor(message: string, setId: string, url: string, taskName: string) {
    this.message = message;
    this.setId = setId;
    this.url = url;
    this.taskName = taskName;
  }
}

module.exports = AddTaskResponse;
