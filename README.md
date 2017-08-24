# node-sellsy

[![npm](https://img.shields.io/npm/v/node-sellsy.svg)](https://www.npmjs.com/package/node-sellsy) ![license](https://img.shields.io/npm/l/node-sellsy.svg) [![github-issues](https://img.shields.io/github/issues/revolunet/node-sellsy.svg)](https://github.com/revolunet/node-sellsy/issues) [![Circle CI build status](https://circleci.com/gh/revolunet/node-sellsy.svg?style=svg)](https://circleci.com/gh/revolunet/node-sellsy)

![nodei.co](https://nodei.co/npm/node-sellsy.png?downloads=true&downloadRank=true&stars=true)

Node Sellsy API wrapper - works in NodeJS **and** in the browser.

The official [Sellsy API](http://api.sellsy.fr/index) is PHP based so here's a JavaScript handy replacement.

It can helps you automate most of Sellsy from their API.

For example i use a Stripe webhook to automate actions in Sellsy.

## Features

 - Works with your oauth private app id
 - Simple promise call for all methods in http://api.sellsy.fr/documentation/methodes

## QuickStart

`npm i --save node-sellsy`

```js

var Sellsy = require('node-sellsy');

var sellsy = new Sellsy({
  creds: {
    consumerKey: 'myConsumerKey',
    consumerSecret: 'myConsumerSecret',
    userToken: 'myUserToken',
    userSecret: 'myUserSecret'
  }
});

var params = {
  search: {
    contains: 'test',
  }
};

sellsy.api({
  method: 'Client.getList',
  params: params
}).then(data => {
  console.log('data', data);
}).catch(e => {
  console.log('error:', e);
});
```

## API

You can access the full Sellsy API using `sellsy.api({ method, params })`.

This call returns a promise.

### Browser usage

Sellsy API doesnt provide CORS access so here's a drop-in proxy you can deploy on your own to use `node-bookeo` on the client : [revolunet/sellsy-proxy](http://github.com/revolunet/sellsy-proxy).

Then, define the endPoint when creating your `Sellsy` instance :

```js
var sellsy = new Sellsy({
  creds,
  endPoint: 'http://path/to/sellsy/proxy'
});
```


### Higher-level API methods :

#### Customer

 - `sellsy.customers.create(data)`
 - `sellsy.customers.get({ email: 'customer@gmail.com' })`

#### Document

 - `sellsy.documents.create(data)`
 - `sellsy.documents.createPayment(docType, docId, paymentData)`
 - `sellsy.documents.getList(docType, search)`
 - `sellsy.documents.getById(docType, docId)`
 - `sellsy.documents.updateStep(docType, docId, step)`

## Scripts

 - **npm run readme** : `node ./node_modules/node-readme/bin/node-readme.js`
 - **npm run test** : `find ./spec -iname '*.spec.js' -exec ./node_modules/.bin/babel-node {} \; | ./node_modules/.bin/tap-spec`
 - **npm run zuul** : `./node_modules/zuul/bin/zuul -- spec/**/*.spec.js`
 - **npm run build** : `babel -d ./dist ./src`

## Tests

```
  Customers.create should call sellsy api

    ✔ should call API twice
    ✔ should call Client.create with correct data
    ✔ should call Client.getList with correct data

  Customers.get should call sellsy api

    ✔ should call API
    ✔ should call get with correct data
    ✔ should return first result

  sellsy.api should be defined

    ✔ should be equal

  sellsy.api should init call oAuth.OAuth with correct parameters

    ✔ consumerKey
    ✔ consumerSecret

  sellsy.api post correct data to API

    ✔ userToken
    ✔ userSecret
    ✔ request
    ✔ io_mode
    ✔ method
    ✔ params

  Sellsy should use default api endPoint

    ✔ https://apifeed.sellsy.com/0/

  Sellsy should use given api endPoint

    ✔ http://path.to/proxy/test/


  total:     17
  passing:   17
  duration:  1.8s
```


## Author

Julien Bouquillon <julien@bouquillon.com> http://github.com/revolunet and [contributors](https://github.com/revolunet/node-sellsy/graphs/contributors)

## License

 - **MIT** : http://opensource.org/licenses/MIT
