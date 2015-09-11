'use strict';

import { when } from 'q';
import test from 'tape';
import sinon from 'sinon';

let Customers = require('../src/Customers');

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
            nbtotal: '1'
          },
          result: {
            1: { hello: 'world'}
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

test("Customers.create should call sellsy api", (t) => {
  t.plan(3);
  var sellsyMock = {
    api: function() {}
  };
  var customers = new Customers(sellsyMock);
  sinon.stub(sellsyMock, 'api', function(options) {
    if (options.method === 'Client.getList') {
      //data.response.infos.nbtota
      return when(dataMocks.Client.getList.valid);
    } else if (options.method === 'Client.create') {
      return when(dataMocks.Client.create.success);
    }
  })
  let customerData = {id: 123};
  customers.create(customerData).then(result => {
    // create the customer then fetch it
    let clientEmail = 'test@test.com';
    let expectedApiCalls =  [{
      method: 'Client.create',
      params: customerData
    },{
      method: 'Client.getList',
      params: { search: customerData }
    },]
    t.equal(sellsyMock.api.callCount, 2, `should call API for get+create`);
    expectedApiCalls.forEach((expectedCall, index) => {
      t.deepEqual(sellsyMock.api.getCall(index).args[0], expectedCall, `should call ${expectedCall.method} with correct data`);
    });
    t.end();
  }).done();
});
/*
test("selssy.api should init call oAuth.OAuth with correct parameters", (t) => {
  let selssy = new Sellsy({
    creds: fakeCreds
  });
  selssy.api();
  t.equal(oAuthMockArguments[2], fakeCreds.consumerKey, 'consumerKey');
  t.equal(oAuthMockArguments[3], fakeCreds.consumerSecret, 'consumerSecret');
  t.end();
});


test("selssy.api post correct data to API", (t) => {
  let selssy = new Sellsy({
    creds: fakeCreds
  });
  let apiParams = {
    method: 'testMethod',
    params: {
      a: 1,
      d: [42, 43, 44]
    }
  };
  selssy.api(apiParams);

  t.equal(oAuthMockPostArguments[1], fakeCreds.userToken, 'userToken');
  t.equal(oAuthMockPostArguments[2], fakeCreds.userSecret, 'userSecret');
  t.equal(oAuthMockPostArguments[3].request, 1, 'request');
  t.equal(oAuthMockPostArguments[3].io_mode, 'json', 'io_mode');

  let params = JSON.parse(oAuthMockPostArguments[3].do_in);
  t.equal(params.method, apiParams.method, 'method');
  t.deepEqual(params.params, apiParams.params, 'params');
  t.end();
});
*/
// test("selssy.api resolve promise on success", (t) => {});
// test("selssy.api reject promise on error", (t) => {});
// test("selssy.api reject promise on 500", (t) => {});
