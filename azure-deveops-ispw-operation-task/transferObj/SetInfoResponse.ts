class SetInfoResponse{
     setid:string="";
	 applicationId:string="";
	 streamName:string="";
	 description:string="";
	 owner:string="";
	 startDate:string="";
	 startTime:string="";
	 deployImplementationDate:string="";
	 deployImplementationTime:string="";
	 deployActiveDate:string="";
	 deployActiveTime:string="";
	 message:string="";
	 state:string="";
	 tasks:TaskInfo[]= new Array();
     constructor(){

     }
}
module.exports= SetInfoResponse;