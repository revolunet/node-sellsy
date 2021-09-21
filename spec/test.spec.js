"use strict";

import test from "tape";
import mockery from "mockery";

// let oAuthMockUrl;
let oAuthMockArguments;
let oAuthMockPostArguments;

const OAuthMock = {
    OAuth: function () {
        oAuthMockArguments = arguments;
        return {
            arguments: arguments,
            post: function () {
                // + url, userToken, userSecret
                // oAuthMockUrl = url;
                oAuthMockPostArguments = arguments;
                return arguments;
            },
        };
    },
};

mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false,
});
mockery.registerMock("oauth", OAuthMock);

let Sellsy = require("../dist").default;

const fakeCreds = {
    consumerKey: "myConsumerKey",
    consumerSecret: "myConsumerSecret",
    userToken: "myUserToken",
    userSecret: "myUserSecret",
};

test("sellsy.api should be defined", (t) => {
    let sellsy = new Sellsy({
        creds: fakeCreds,
    });
    t.equal(typeof sellsy.api, "function");
    t.end();
});

test("sellsy.api should init call oAuth.OAuth with correct parameters", (t) => {
    let sellsy = new Sellsy({
        creds: fakeCreds,
    });
    sellsy.api();
    t.equal(oAuthMockArguments[2], fakeCreds.consumerKey, "consumerKey");
    t.equal(oAuthMockArguments[3], fakeCreds.consumerSecret, "consumerSecret");
    t.end();
});

test("sellsy.api post correct data to API", (t) => {
    let sellsy = new Sellsy({
        creds: fakeCreds,
    });
    let apiParams = {
        method: "testMethod",
        params: {
            a: 1,
            d: [42, 43, 44],
        },
    };
    sellsy.api(apiParams);

    t.equal(oAuthMockPostArguments[1], fakeCreds.userToken, "userToken");
    t.equal(oAuthMockPostArguments[2], fakeCreds.userSecret, "userSecret");
    t.equal(oAuthMockPostArguments[3].request, 1, "request");
    t.equal(oAuthMockPostArguments[3].io_mode, "json", "io_mode");

    let params = JSON.parse(oAuthMockPostArguments[3].do_in);
    t.equal(params.method, apiParams.method, "method");
    t.deepEqual(params.params, apiParams.params, "params");
    t.end();
});

test("Sellsy should use default api endPoint", (t) => {
    let sellsy = new Sellsy({
        creds: fakeCreds,
    });
    let apiParams = {};
    sellsy.api(apiParams);

    t.equal(
        oAuthMockPostArguments[0],
        "https://apifeed.sellsy.com/0/",
        "https://apifeed.sellsy.com/0/"
    );

    t.end();
});

test("Sellsy should use given api endPoint", (t) => {
    let sellsy = new Sellsy({
        creds: fakeCreds,
        endPoint: "http://path.to/proxy/test",
    });
    let apiParams = {};
    sellsy.api(apiParams);

    t.equal(
        oAuthMockPostArguments[0],
        "http://path.to/proxy/test/",
        "http://path.to/proxy/test/"
    );

    t.end();
});

// test("sellsy.api resolve promise on success", (t) => {});
// test("sellsy.api reject promise on error", (t) => {});
// test("sellsy.api reject promise on 500", (t) => {});
