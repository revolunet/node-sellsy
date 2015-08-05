# node-sellsy

![npm](https://img.shields.io/npm/v/node-sellsy.svg) ![license](https://img.shields.io/npm/l/node-sellsy.svg) ![github-issues](https://img.shields.io/github/issues/revolunet/node-babel-boilerplate.svg) ![Circle CI build status](https://circleci.com/gh/revolunet/node-babel-boilerplate.svg?style=svg)

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
// in creds.js
const creds = {
  consumerKey: 'myConsumerKey',
  consumerSecret: 'myConsumerSecret',
  userToken: 'myUserToken',
  userSecret: 'myUserSecret'
};

// example.js
var Sellsy = require('./dist');

var sellsy = new Sellsy({
  creds: require('./creds.js')
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

## Scripts

 - **npm run readme** : `node ./node_modules/node-readme/bin/node-readme.js`
 - **npm run test** : `find ./spec -iname '*.spec.js' -exec ./node_modules/.bin/babel-node {} \; | ./node_modules/.bin/tap-spec`
 - **npm run zuul** : `./node_modules/zuul/bin/zuul -- spec/**/*.spec.js`
 - **npm run build** : `babel -d ./dist ./src`

## Dependencies

Package | Version | Dev
--- |:---:|:---:
[babel](https://www.npmjs.com/package/babel) | 5.6.23 | ✔
[babel-eslint](https://www.npmjs.com/package/babel-eslint) | 3.1.23 | ✔
[babelify](https://www.npmjs.com/package/babelify) | 6.1.2 | ✔
[eslint](https://www.npmjs.com/package/eslint) | 1.0.0-rc-1 | ✔
[eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb) | 0.0.6 | ✔
[node-readme](https://www.npmjs.com/package/node-readme) | 0.1.8 | ✔
[tap-spec](https://www.npmjs.com/package/tap-spec) | 4.0.2 | ✔
[tape](https://www.npmjs.com/package/tape) | 4.0.0 | ✔
[zuul](https://www.npmjs.com/package/zuul) | 3.2.0 | ✔


## Author

Julien Bouquillon <julien@bouquillon.com> http://github.com/revolunet

## License

 - **MIT** : http://opensource.org/licenses/MIT
