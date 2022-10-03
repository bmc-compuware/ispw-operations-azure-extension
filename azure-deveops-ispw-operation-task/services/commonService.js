"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require('node-fetch');
const https = require('https');
const axios = require('axios');
class CommonService {
    constructor() {
    }
    doPostRequest(url, payload, cesToken, action, isPrintEnable) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                headers: { 'Content-Type': 'application/json', 'Authorization': cesToken }
            };
            try {
                if (isPrintEnable) {
                    logRequest(url, options.headers, payload, cesToken, action, "POST");
                }
                let res = yield axios.post(url, payload, options);
                let rt = res.data;
                if (isPrintEnable) {
                    logResponse(rt);
                }
                return rt;
            }
            catch (error) {
                if (error.response) {
                    console.error(error.response.data);
                    console.error(error.response.status);
                    console.error(error.response.headers);
                }
                else if (error.request) {
                    console.error(error.request);
                }
                else {
                    console.error('Error', error.message);
                }
                return error.message;
            }
        });
    }
    doGetRequest(url, cesToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield axios.get(url, {
                    headers: {
                        'Authorization': cesToken
                    }
                });
                console.log("response " + res.data);
                return res.data;
            }
            catch (error) {
                console.log('Error', error);
            }
        });
    }
}
function logRequest(url, header, body, token, action, methodType) {
    console.log("### " + action + " - " + "RFC 2616");
    console.log(methodType + " " + url + " HTTP/1.1");
    console.log("Content-type: " + "application/json");
    console.log("Authorization: " + token);
    console.log("Request Body: " + JSON.stringify(body));
    console.log("Headers: " + JSON.stringify(header));
}
function logResponse(response) {
    console.log("response: " + JSON.stringify(response));
}
module.exports = CommonService;
