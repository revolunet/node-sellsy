import ERRORS from "./ERRORS";

const DEFAULT_GET_LIST_PAGINATION = {
  nbperpage: 100,
  pagenum: 1,
};

const DEFAULT_GET_LIST_ORDER = {
  direction: "ASC",
  order: "doc_displayedDate",
};

class Documents {
  constructor(sellsy) {
    this.sellsy = sellsy;
  }

  create(data) {
    let method = data.docid ? "update" : "create";
    return this.sellsy
      .api({
        method: `Document.${method}`,
        params: data,
      })
      .then((result) => {
        if (result.status === "success") {
          return this.getById(data.document.doctype, result.response.doc_id);
        }
        throw new Error(ERRORS.DOCUMENT_CREATE_ERROR);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  updateStep(docType, docId, step) {
    return this.sellsy
      .api({
        method: "Document.updateStep",
        params: {
          document: {
            doctype: docType,
            step: step,
          },
          docid: docId,
        },
      })
      .then((data) => {
        return data.response;
      })
      .catch((e) => {
        throw new Error(ERRORS.DOCUMENT_UPDATESTEP_ERROR);
      });
  }

  createPayment(docType, docId, paymentData) {
    return this.sellsy
      .api({
        method: "Document.createPayment",
        params: {
          payment: {
            doctype: docType,
            docid: docId,
            ...paymentData,
          },
        },
      })
      .then((data) => {
        return data.response;
      })
      .catch((e) => {
        throw new Error(ERRORS.DOCUMENT_CREATEPAYMENT_ERROR);
      });
  }

  getById(docType, docId) {
    return this.sellsy
      .api({
        method: "Document.getOne",
        params: {
          doctype: docType,
          docid: docId,
        },
      })
      .then((data) => {
        return data.response;
      })
      .catch((e) => {
        throw new Error(ERRORS.DOCUMENT_NOT_FOUND);
      });
  }

  getList(
    docType,
    search,
    pagination = DEFAULT_GET_LIST_PAGINATION,
    includePayments = "N",
    order = DEFAULT_GET_LIST_ORDER
  ) {
    return this.sellsy
      .api({
        method: "Document.getList",
        params: {
          doctype: docType,
          search,
          order,
          pagination,
          includePayments,
        },
      })
      .then((data) => {
        return data.response;
      })
      .catch((e) => {
        throw new Error(ERRORS.DOCUMENT_NOT_FOUND);
      });
  }
}

export default Documents;
