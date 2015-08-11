'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var OAuth = require('oauth');
var Q = require('q');

var api = {
  url: 'https://apifeed.sellsy.com/0/',
  requestTokenUrl: 'https://apifeed.sellsy.com/0/request_token',
  accessTokenUrl: 'https://apifeed.sellsy.com/0/access_token'
};

function Sellsy() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$creds = _ref.creds;
  var creds = _ref$creds === undefined ? {} : _ref$creds;

  this.creds = creds;
}

Sellsy.prototype.api = function () {
  var _this = this;

  var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref2$method = _ref2.method;
  var method = _ref2$method === undefined ? 'Infos.getInfos' : _ref2$method;
  var _ref2$params = _ref2.params;
  var params = _ref2$params === undefined ? {} : _ref2$params;

  var getOauth = function getOauth() {

    return new OAuth.OAuth(api.requestTokenUrl, api.accessTokenUrl, _this.creds.consumerKey, _this.creds.consumerSecret, '1.0', null, 'PLAINTEXT');
  };

  var deferred = Q.defer();

  var postData = {
    request: 1,
    io_mode: 'json',
    do_in: JSON.stringify({
      method: method,
      params: params
    })
  };

  getOauth().post(api.url, this.creds.userToken, this.creds.userSecret, postData, function (e, data, res) {
    if (e) {
      return deferred.reject(e);
    }
    if (data.error) {
      console.log('data.eror', data.error);
      return deferred.reject(data.error);
    }
    return deferred.resolve(data);
  });

  return deferred.promise;
};

exports['default'] = Sellsy;
module.exports = exports['default'];