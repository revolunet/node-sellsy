'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ERRORS = require('./ERRORS');

var _ERRORS2 = _interopRequireDefault(_ERRORS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Customers = function Customers(sellsy) {
  var _this = this;

  _classCallCheck(this, Customers);

  this.create = function (data) {
    var method = data.clientid ? 'update' : 'create';
    return _this.sellsy.api({
      method: 'Client.' + method,
      params: data
    }).then(function (data) {
      if (data.status === 'success') {
        // fetch created customer data
        return _this.sellsy.api({
          method: 'Client.getOne',
          params: {
            clientid: data.response.client_id
          }
        }).then(function (data) {
          return data.response.client;
        });
      }
      throw new Error(_ERRORS2.default.CUSTOMER_CREATE_ERROR);
    });
  };

  this.get = function (search) {
    return _this.sellsy.api({
      method: 'Client.getList',
      params: {
        search: search
      }
    }).then(function (data) {
      if (data.response.infos.nbtotal !== '0') {
        // always return first result
        var keys = Object.keys(data.response.result);
        return data.response.result[keys[0]];
      } else {
        throw new Error(_ERRORS2.default.CUSTOMER_NOT_FOUND);
      }
    }).catch(function (e) {
      throw new Error(_ERRORS2.default.CUSTOMER_NOT_FOUND);
    });
  };

  this.udpate = this.create;
  this.sellsy = sellsy;
};

exports.default = Customers;