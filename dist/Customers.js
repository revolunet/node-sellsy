'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ERRORS = require('./ERRORS');

var _ERRORS2 = _interopRequireDefault(_ERRORS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Customers = function () {
  function Customers(sellsy) {
    _classCallCheck(this, Customers);

    this.udpate = this.create.bind(this);
    this.sellsy = sellsy;
  }

  _createClass(Customers, [{
    key: 'create',
    value: function create(data) {
      var _this = this;

      var method = data.clientid ? 'update' : 'create';
      return this.sellsy.api({
        method: 'Client.' + method,
        params: data
      }).then(function (data) {
        if (data.status === 'success') {
          return _this.get({ id: data.response.client_id });
        }
        throw new Error(_ERRORS2.default.CUSTOMER_CREATE_ERROR);
      });
    }
  }, {
    key: 'get',
    value: function get(search) {
      return this.sellsy.api({
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
    }
  }]);

  return Customers;
}();

exports.default = Customers;