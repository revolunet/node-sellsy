"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ERRORS = _interopRequireDefault(require("./ERRORS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Customers = /*#__PURE__*/function () {
  function Customers(sellsy) {
    _classCallCheck(this, Customers);

    this.udpate = this.create;
    this.sellsy = sellsy;
  }

  _createClass(Customers, [{
    key: "create",
    value: function create(data) {
      var _this = this;

      var method = data.clientid ? "update" : "create";
      return this.sellsy.api({
        method: "Client.".concat(method),
        params: data
      }).then(function (data) {
        if (data.status === "success") {
          // fetch created customer data
          return _this.sellsy.api({
            method: "Client.getOne",
            params: {
              clientid: data.response.client_id
            }
          }).then(function (data) {
            return data.response.client;
          });
        }

        throw new Error(_ERRORS["default"].CUSTOMER_CREATE_ERROR);
      });
    }
  }, {
    key: "get",
    value: function get(search) {
      return this.sellsy.api({
        method: "Client.getList",
        params: {
          search: search
        }
      }).then(function (data) {
        if (data.response.infos.nbtotal !== "0") {
          // always return first result
          var keys = Object.keys(data.response.result);
          return data.response.result[keys[0]];
        } else {
          throw new Error(_ERRORS["default"].CUSTOMER_NOT_FOUND);
        }
      })["catch"](function () {
        throw new Error(_ERRORS["default"].CUSTOMER_NOT_FOUND);
      });
    }
  }]);

  return Customers;
}();

var _default = Customers;
exports["default"] = _default;