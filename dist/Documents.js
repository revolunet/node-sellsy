"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ERRORS = _interopRequireDefault(require("./ERRORS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_GET_LIST_PAGINATION = {
  nbperpage: 100,
  pagenum: 1
};
var DEFAULT_GET_LIST_ORDER = {
  direction: "ASC",
  order: "doc_displayedDate"
};

var Documents = /*#__PURE__*/function () {
  function Documents(sellsy) {
    _classCallCheck(this, Documents);

    this.sellsy = sellsy;
  }

  _createClass(Documents, [{
    key: "create",
    value: function create(data) {
      var _this = this;

      var method = data.docid ? "update" : "create";
      return this.sellsy.api({
        method: "Document.".concat(method),
        params: data
      }).then(function (result) {
        if (result.status === "success") {
          return _this.getById(data.document.doctype, result.response.doc_id);
        }

        throw new Error(_ERRORS["default"].DOCUMENT_CREATE_ERROR);
      })["catch"](function (e) {
        throw new Error(e);
      });
    }
  }, {
    key: "updateStep",
    value: function updateStep(docType, docId, step) {
      return this.sellsy.api({
        method: "Document.updateStep",
        params: {
          document: {
            doctype: docType,
            step: step
          },
          docid: docId
        }
      }).then(function (data) {
        return data.response;
      })["catch"](function (e) {
        throw new Error(_ERRORS["default"].DOCUMENT_UPDATESTEP_ERROR);
      });
    }
  }, {
    key: "createPayment",
    value: function createPayment(docType, docId, paymentData) {
      return this.sellsy.api({
        method: "Document.createPayment",
        params: {
          payment: _objectSpread({
            doctype: docType,
            docid: docId
          }, paymentData)
        }
      }).then(function (data) {
        return data.response;
      })["catch"](function (e) {
        throw new Error(_ERRORS["default"].DOCUMENT_CREATEPAYMENT_ERROR);
      });
    }
  }, {
    key: "getById",
    value: function getById(docType, docId) {
      return this.sellsy.api({
        method: "Document.getOne",
        params: {
          doctype: docType,
          docid: docId
        }
      }).then(function (data) {
        return data.response;
      })["catch"](function (e) {
        throw new Error(_ERRORS["default"].DOCUMENT_NOT_FOUND);
      });
    }
  }, {
    key: "getList",
    value: function getList(docType, search) {
      var pagination = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_GET_LIST_PAGINATION;
      var includePayments = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "N";
      var order = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : DEFAULT_GET_LIST_ORDER;
      return this.sellsy.api({
        method: "Document.getList",
        params: {
          doctype: docType,
          search: search,
          order: order,
          pagination: pagination,
          includePayments: includePayments
        }
      }).then(function (data) {
        return data.response;
      })["catch"](function (e) {
        throw new Error(_ERRORS["default"].DOCUMENT_NOT_FOUND);
      });
    }
  }]);

  return Documents;
}();

var _default = Documents;
exports["default"] = _default;