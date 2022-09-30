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
      let res = await axios.post(url, payload, options);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        // Request made and server responded
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
      return error.message;
    }
  }
  async doGetRequest(url: string, cesToken: string) {
    try {
      let res = await axios.get(url, {
        headers: {
          'Authorization': cesToken
        }
      });
      console.log("response "+res.data);
      return res.data;
    } catch (error) {
      console.log('Error',error);
    }
  }

}
module.exports = CommonService;