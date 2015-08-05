
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
