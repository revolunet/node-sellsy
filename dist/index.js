"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _oauth = _interopRequireDefault(require("oauth"));

var _Customers = _interopRequireDefault(require("./Customers"));

var _Documents = _interopRequireDefault(require("./Documents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DEFAULT_ENDPOINT = "https://apifeed.sellsy.com/0";
var api = {
  url: "/",
  requestTokenUrl: "/request_token",
  accessTokenUrl: "/access_token"
};

function Sellsy() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$creds = _ref.creds,
      creds = _ref$creds === void 0 ? {} : _ref$creds,
      _ref$endPoint = _ref.endPoint,
      endPoint = _ref$endPoint === void 0 ? DEFAULT_ENDPOINT : _ref$endPoint;

  this.creds = creds;
  this.endPoint = endPoint;
  this.customers = new _Customers["default"](this);
  this.documents = new _Documents["default"](this);
}

Sellsy.prototype.api = function () {
  var _this = this;

  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$method = _ref2.method,
      method = _ref2$method === void 0 ? "Infos.getInfos" : _ref2$method,
      _ref2$params = _ref2.params,
      params = _ref2$params === void 0 ? {} : _ref2$params;

  var getOauth = function getOauth() {
    return new _oauth["default"].OAuth(_this.endPoint + api.requestTokenUrl, _this.endPoint + api.accessTokenUrl, _this.creds.consumerKey, _this.creds.consumerSecret, "1.0", null, "PLAINTEXT");
  };

  return new Promise(function (resolve, reject) {
    var postData = {
      request: 1,
      io_mode: "json",
      do_in: JSON.stringify({
        method: method,
        params: params
      })
    };
    getOauth().post(_this.endPoint + api.url, _this.creds.userToken, _this.creds.userSecret, postData, function (e, data) {
      // res
      try {
        if (e) {
          return reject(e);
        }

        if (data.error) {
          return reject(data.error);
        }

        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
  });
};

var _default = Sellsy;
exports["default"] = _default;