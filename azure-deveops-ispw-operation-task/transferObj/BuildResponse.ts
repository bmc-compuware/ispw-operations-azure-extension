class BuildResponse implements IspwResponse {
  setId: string;
  assignmentId: string;
  message: string;
  url: string;
  tasks:TaskInfo[];

  constructor(
    assignmentId: string,
    setId: string,
    message: string,
    url: string,
    taskName: string
  ) {
    this.assignmentId = assignmentId;
    this.setId = setId;
    this.message = message;
    this.url = url;
    this.tasks = new Array();;
  }
}

module.exports = BuildResponse;
