class AssignmentInfo implements IspwResponse {
  stream: string;
  application: string;
  subAppl: string;
  defaultPath: string;
  description: string;
  owner: string;
  assignmentPrefix: string;
  sandbox: string;
  refNumber: String;
  releaseId: String;
  userTag: String;
  projectNumber: String;
  message: String;

  constructor(
    stream: string,
    application: string,
    subAppl: string,
    defaultPath: string,
    description: string,
    owner: string,
    assignmentPrefix: string,
    sandbox: string,
    refNumber: String,
    releaseId: String,
    userTag: String,
    projectNumber: String,
    message: String
  ) {
    this.stream = stream;
    this.application = application;
    this.subAppl = subAppl;
    this.defaultPath = defaultPath;
    this.description = description;
    this.owner = owner;
    this.assignmentPrefix = assignmentPrefix;
    this.sandbox = sandbox;
    this.refNumber=refNumber;
    this.releaseId= releaseId;
    this.userTag= userTag,
    this.projectNumber= projectNumber,
    this.message= message

  }
}

module.exports = AssignmentInfo;