"use strict";
class Input {
    constructor(host, port, codePage, cesUrl, payload, cesToken) {
        this.host = host;
        this.port = port;
        this.cesUrl = cesUrl;
        this.codePage = codePage;
        this.payload = payload;
        this.cesToken = cesToken;
    }
}
module.exports = Input;
