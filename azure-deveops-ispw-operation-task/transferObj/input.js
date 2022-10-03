"use strict";
class Input {
    constructor(host, port, codePage, cesUrl, payload, cesToken, skipWaitingForSetCompletion, showResponseBodyInConsole) {
        this.skipWaitingForSetCompletion = false;
        this.showResponseBodyInConsole = false;
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
