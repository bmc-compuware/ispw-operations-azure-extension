class AssignmentResponse implements IspwResponse {
  assignmentId: string;
  message: string;
  url: string;

  constructor(assignmentId: string, message: string, url: string) {
    this.assignmentId = assignmentId;
    this.message = message;
    this.url = url;
  }
}

module.exports = AssignmentResponse;
