class Input {
    public host: string;
    public port: string;
    public cesUrl: string;
    public codePage: string;
    public payload:string;
    public cesToken:string;
    constructor(host: string, port: string, codePage: string, cesUrl: string, payload:string,cesToken:string) {
        this.host = host;
        this.port = port;
        this.cesUrl = cesUrl;
        this.codePage = codePage;
        this.payload = payload;
        this.cesToken=cesToken;
    }
}
module.exports = Input;