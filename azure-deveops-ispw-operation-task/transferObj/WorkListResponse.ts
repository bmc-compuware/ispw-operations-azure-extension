class WorkListResponse implements IspwResponse {
  workListItems: WorkListInfo[] = new Array();
  message: string = "";

  constructor() {}
}

module.exports = WorkListResponse;
