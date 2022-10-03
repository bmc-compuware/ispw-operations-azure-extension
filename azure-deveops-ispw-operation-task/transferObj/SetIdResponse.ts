class SetIdResponse  implements IspwResponse{
    message:string;
    setId:string;
    url:string;
    constructor(message:string,setId:string,url:string){
        this.message=message;
        this.setId=setId;
        this.url=url;
    }

}

module.exports= SetIdResponse;