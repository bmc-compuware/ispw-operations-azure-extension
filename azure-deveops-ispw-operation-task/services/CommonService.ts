import { json } from "stream/consumers";
const fetch = require('node-fetch')
const https = require('https');
const axios = require('axios');



class CommonService {
  constructor() {

  }
  async doPostRequest(url: string, payload: string, cesToken: string, action: string, isPrintEnable: boolean) {
    const options = {
      headers: { 'Content-Type': 'application/json', 'Authorization': cesToken }
    };
    try {
      console.log("Starting ISPW Operations Plugin...");
      if (isPrintEnable) {
        logRequest(url, options.headers, payload, cesToken, action, "POST");
      }      
      let res = await axios.post(url, payload, options);
      let rt = res.data;
      if (isPrintEnable) {
        logResponse(rt);
      }

      return rt;
    } catch (error: any) {
      console.error("\nError ::");
      if (error.response) {
        console.error(error.response.data.message);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error('Error', error.message);
      }
      return error.response.data;
    }
  }
  async doGetRequest(url: string, cesToken: string) {
    try {
      let res = await axios.get(url, {
        headers: {
          'Authorization': cesToken
        }
      });
      return res.data;
    } catch (error) {
      console.log('Error', error);
    }
  }

}

function logRequest(url: string, header: any, body: string, token: string, action: string, methodType: string) {
  console.log("### " + action + " - " + "RFC 2616");
  console.log(methodType + " " + url + " HTTP/1.1");
  console.log("Content-type: " + "application/json");
  console.log("Authorization: " + token);
  console.log("Request Body: " + JSON.stringify(body));
  console.log("Headers: " + JSON.stringify(header));
}

function logResponse(response: string) {
  console.log("response: " + JSON.stringify(response));
}



module.exports = CommonService;