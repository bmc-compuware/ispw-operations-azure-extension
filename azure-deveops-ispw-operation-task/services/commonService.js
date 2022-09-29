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
    doPostRequest(url, payload, cesToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                headers: { 'Content-Type': 'application/json', 'Authorization': cesToken }
            };
            try {
                let res = yield axios.post(url, payload, options);
                return res.data;
            }
            catch (error) {
                if (error.response) {
                    // Request made and server responded
                    console.error(error.response.data);
                    console.error(error.response.status);
                    console.error(error.response.headers);
                }
                else if (error.request) {
                    // The request was made but no response was received
                    console.error(error.request);
                }
                else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error', error.message);
                }
                return error.message;
            }
        });
    }
}
module.exports = CommonService;
