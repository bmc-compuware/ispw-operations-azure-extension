class Input {
    public host: string;
    public port: string;
    public cesUrl: string;
    public codePage: string;
    public payload: string;
    public cesToken: string;
    public skipWaitingForSetCompletion: boolean = false;
    public showResponseBodyInConsole: boolean = false;
    constructor(host: string, port: string, codePage: string, cesUrl: string, payload: string, cesToken: string, skipWaitingForSetCompletion: boolean, showResponseBodyInConsole: boolean) {
        this.host = host;
        this.port = port;
        this.cesUrl = cesUrl;
        this.codePage = codePage;
        this.payload = payload;
        this.cesToken = cesToken;
        this.skipWaitingForSetCompletion = skipWaitingForSetCompletion;
        this.showResponseBodyInConsole = showResponseBodyInConsole;
    }
}
module.exports = Input;