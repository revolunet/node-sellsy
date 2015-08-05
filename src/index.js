
var OAuth = require('oauth');
var Q = require('q');

const api = {
  url: 'https://apifeed.sellsy.com/0/',
  requestTokenUrl: 'https://apifeed.sellsy.com/0/request_token',
  accessTokenUrl: 'https://apifeed.sellsy.com/0/access_token',
}


function Sellsy({creds = {}} = {}) {
  this.creds = creds;
}

Sellsy.prototype.api = function({method = 'Infos.getInfos', params = {}} = {}) {


  var that = this;
  function getOauth() {

    return new OAuth.OAuth(
      api.requestTokenUrl,
      api.accessTokenUrl,
      that.creds.consumerKey,
      that.creds.consumerSecret,
      '1.0',
      null,
      'PLAINTEXT'
    );

  }

  let deferred = Q.defer();

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
    function (e, data, res){
      if (e) {
        return deferred.reject(e);
      }
      if (data.error) {
        console.log('data.eror', data.error);
        return deferred.reject(data.error);
      }
      return deferred.resolve(data);
    }
  );

  return deferred.promise;
}

export default Sellsy;
