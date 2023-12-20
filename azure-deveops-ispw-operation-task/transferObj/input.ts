class Input {
    public host: string;
    public port: string;
    public cesUrl: string;
    public codePage: string;
    public payload: string;
    public authType: string;
    public cesToken: string;
    public certificate: string;
    public key: string;
    public buildAutomatically: boolean = false;
    public skipWaitingForSetCompletion: boolean = false;
    public showResponseBodyInConsole: boolean = false;
    public trustAllCerts: boolean = false;
    constructor(host: string, port: string, codePage: string, cesUrl: string, payload: string, authType: string, cesToken: string, certificate: string, key: string, buildAutomatically: boolean, skipWaitingForSetCompletion: boolean, showResponseBodyInConsole: boolean, trustAllCerts: boolean) {
        this.host = host;
        this.port = port;
        this.cesUrl = cesUrl;
        this.codePage = codePage;
        this.payload = payload;
        this.authType = authType;
        this.cesToken = cesToken;
        this.certificate = certificate;
        this.key = key;
        this.buildAutomatically = buildAutomatically;
        this.skipWaitingForSetCompletion = skipWaitingForSetCompletion;
        this.showResponseBodyInConsole = showResponseBodyInConsole;
        this.trustAllCerts = trustAllCerts;
    }
}
module.exports = Input;