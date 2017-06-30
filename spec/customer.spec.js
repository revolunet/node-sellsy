'use strict';

import test from 'tape';
import sinon from 'sinon';

import Customers from '../src/Customers';

// sample sellsy responses
const dataMocks = {
  Client: {
    create: {
      success: {
        status: 'success',
        response: {client_id: 123}
      }
    },
    getList: {
      valid: {
        response: {
          infos: {
            nbtotal: '2'
          },
          result: {
            1: { hello: 'world'},
            2: { x: '123'}
          }
        }
      },
      invalid: {
        response: {
          infos: {
            nbtotal: '0'
          },
          result: []
        }
      }
    }
  }
};

function getSellsyApiMock(apiMock) {
  // stub sellsy responses with a custom function
  let sellsyMock = {
    api: function() {}
  };
  sinon.stub(sellsyMock, 'api', apiMock);
  return sellsyMock;
}

test("Customers.create should call sellsy api", (t) => {
  t.plan(3);

  var sellsyMock = getSellsyApiMock(function(options) {
    if (options.method === 'Client.getList') {
      return Promise.resolve(dataMocks.Client.getList.valid);
    } else if (options.method === 'Client.create') {
      return Promise.resolve(dataMocks.Client.create.success);
    }
  });
  var customers = new Customers(sellsyMock);

  let customerData = {id: 123};
  customers.create(customerData).then(result => {
    // should create the customer then fetch it
    let clientEmail = 'test@test.com';
    let expectedApiCalls =  [{
      method: 'Client.create',
      params: customerData
    },{
      method: 'Client.getList',
      params: { search: customerData }
    },]
    t.equal(sellsyMock.api.callCount, 2, `should call API twice`);
    expectedApiCalls.forEach((expectedCall, index) => {
      t.deepEqual(sellsyMock.api.getCall(index).args[0], expectedCall, `should call ${expectedCall.method} with correct data`);
    });
    t.end();
  }).catch(console.log);
});

test("Customers.get should call sellsy api", (t) => {
  t.plan(3);

  var sellsyMock = getSellsyApiMock(function(options) {
    return Promise.resolve(dataMocks.Client.getList.valid);
  });
  var customers = new Customers(sellsyMock);

  let searchParams = {abc: 123};
  let result = null;
  customers.get(searchParams).then(result => {
    let firstResult = dataMocks.Client.getList.valid.response.result[Object.keys(dataMocks.Client.getList.valid.response.result)[0]];
    t.deepEqual(result, firstResult, `should return first result`);
  }).catch(console.log);
  t.equal(sellsyMock.api.callCount, 1, `should call API`);
  let expectedCall = {
    method: 'Client.getList',
    params: {
      search: searchParams
    }
  };
  t.deepEqual(sellsyMock.api.getCall(0).args[0], expectedCall, `should call get with correct data`);

});
