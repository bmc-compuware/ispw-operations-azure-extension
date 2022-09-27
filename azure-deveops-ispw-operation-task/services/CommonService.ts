import { json } from "stream/consumers";
const fetch = require('node-fetch')
const https = require('https');
const axios = require('axios');



class CommonService {
    constructor() {

    }
    async doPostRequest(url: string, payload: string, cesToken: string) {
        const options = {
            headers: { 'Content-Type': 'application/json', 'Authorization': cesToken }
        };
        try {
            let res = await axios.post(url, payload, options)
            if(!res.ok){
                console.log("error "+res.data.message);     
            }
            return res.data;

        } catch (error: any) {
            console.log(error.response);
            return error.response;
        }
    }
}
module.exports = CommonService;