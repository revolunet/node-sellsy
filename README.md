# node-sellsy

![npm](https://img.shields.io/npm/v/node-sellsy.svg) ![license](https://img.shields.io/npm/l/node-sellsy.svg) ![github-issues](https://img.shields.io/github/issues/revolunet/node-sellsy.svg) ![Circle CI build status](https://circleci.com/gh/revolunet/node-sellsy.svg?style=svg)

![nodei.co](https://nodei.co/npm/node-sellsy.png?downloads=true&downloadRank=true&stars=true)

Node Sellsy API wrapper

The official [Sellsy API](http://api.sellsy.fr/index) is PHP based so here's a NodeJs handy replacement.

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

const params = {
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

## Api

You can access the full Sellsy API using `sellsy.api({ method, params })`.

Higher-level methods :

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

## Author

Julien Bouquillon <julien@bouquillon.com> http://github.com/revolunet

## License

 - **MIT** : http://opensource.org/licenses/MIT
