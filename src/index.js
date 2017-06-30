var OAuth = require('oauth');

import Customers from './Customers';
import Documents from './Documents';

const api = {
  url: 'https://apifeed.sellsy.com/0/',
  requestTokenUrl: 'https://apifeed.sellsy.com/0/request_token',
  accessTokenUrl: 'https://apifeed.sellsy.com/0/access_token',
};


function Sellsy({ creds = {} } = {}) {
  this.creds = creds;
  this.customers = new Customers(this);
  this.documents = new Documents(this);
}

Sellsy.prototype.api = function({ method = 'Infos.getInfos', params = {} } = {}) {

  const getOauth = () => {

    return new OAuth.OAuth(
      api.requestTokenUrl,
      api.accessTokenUrl,
      this.creds.consumerKey,
      this.creds.consumerSecret,
      '1.0',
      null,
      'PLAINTEXT'
    );

  }

  return new Promise((resolve, reject) => {
    const postData = {
      request: 1,
      io_mode: 'json',
      do_in: JSON.stringify({
        method: method,
        params: params
      })
    };

    getOauth().post(
      api.url,
      this.creds.userToken,
      this.creds.userSecret,
      postData,
      function(e, data, res) {
        if (e) {
          console.log('oauth.error', e);
          console.log('Sellsy.api OAUTH ERROR', method, params);
          return reject(e);
        }
        if (data.error) {
          console.log('oauth.data.error', data.error);
          console.log('Sellsy.api ERROR', method, params);
          return reject(data.error);
        }
        //console.log('Sellsy.api', method, params, data);
        resolve(JSON.parse(data));
      }
    );
  })

}

export default Sellsy;
module.exports = Sellsy;