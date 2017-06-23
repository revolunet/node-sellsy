'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Customers = require('./Customers');

var _Customers2 = _interopRequireDefault(_Customers);

var _Documents = require('./Documents');

var _Documents2 = _interopRequireDefault(_Documents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OAuth = require('oauth');
var Q = require('q');

var api = {
  url: 'https://apifeed.sellsy.com/0/',
  requestTokenUrl: 'https://apifeed.sellsy.com/0/request_token',
  accessTokenUrl: 'https://apifeed.sellsy.com/0/access_token'
};

function Sellsy() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$creds = _ref.creds,
      creds = _ref$creds === undefined ? {} : _ref$creds;

  this.creds = creds;
  this.customers = new _Customers2.default(this);
  this.documents = new _Documents2.default(this);
}

Sellsy.prototype.api = function () {
  var _this = this;

  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$method = _ref2.method,
      method = _ref2$method === undefined ? 'Infos.getInfos' : _ref2$method,
      _ref2$params = _ref2.params,
      params = _ref2$params === undefined ? {} : _ref2$params;

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
      console.log('oauth.error', e);
      console.log('Sellsy.api OAUTH ERROR', method, params);
      return deferred.reject(e);
    }
    if (data.error) {
      console.log('oauth.data.error', data.error);
      console.log('Sellsy.api ERROR', method, params);
      return deferred.reject(data.error);
    }
    //console.log('Sellsy.api', method, params, data);
    return deferred.resolve(JSON.parse(data));
  });

  return deferred.promise;
};

exports.default = Sellsy;

module.exports = Sellsy;