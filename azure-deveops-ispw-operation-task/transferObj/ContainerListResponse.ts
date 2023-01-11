class ContainerListResponse implements IspwResponse {
  containers:ContainerListInfo[] = new Array();
  message:string = "";

  constructor() {
    
  }
}

module.exports = ContainerListResponse;
