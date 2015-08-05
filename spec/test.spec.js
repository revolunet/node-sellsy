'use strict';

import test from 'tape';
import mockery from 'mockery';

let oAuthMockArguments;
let oAuthMockPostArguments;

const OAuthMock = {
    OAuth: function () {
			oAuthMockArguments = arguments
			return {
				'arguments': arguments,
				post: function(url, userToken, userSecret) {
					oAuthMockPostArguments = arguments;
					return arguments;
				}
			};
		}
};

mockery.enable();
mockery.registerMock('oauth', OAuthMock);

let Sellsy = require('../dist');

const fakeCreds = {
  consumerKey: 'myConsumerKey',
  consumerSecret: 'myConsumerSecret',
  userToken: 'myUserToken',
  userSecret: 'myUserSecret'
};

test("selssy.api should be defined", (t) => {
	let selssy = new Sellsy({
		creds: fakeCreds
	})
	t.equal(typeof selssy.api, 'function');
	t.end();
});

test("selssy.api should init call oAuth.OAuth with correct parameters", (t) => {
	let selssy = new Sellsy({
		creds: fakeCreds
	});
	selssy.api(),
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
			a:1,
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

// test("selssy.api resolve promise on success", (t) => {});
// test("selssy.api reject promise on error", (t) => {});
// test("selssy.api reject promise on 500", (t) => {});
