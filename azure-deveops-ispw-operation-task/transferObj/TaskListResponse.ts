class TaskListResponse implements IspwResponse {
  tasks: TaskInfo[] = new Array();
  message: String = "";
}

module.exports = TaskListResponse;
