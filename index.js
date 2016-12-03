var proxyChecker = require('proxy-checker');
var alignString = require('./src/align-string');
var removeLineFromFile = require('./src/remove-line-from-file');
var configuration = JSON.parse(require('fs').readFileSync('configuration.json', 'utf-8'))

proxyChecker.checkProxiesFromFile(
	'proxies.txt', {
		url: configuration['blocked-url'],
		regex: new RegExp(configuration['regex-for-valid-response'])
	},
	// Callback function to be called after the check 
	function(host, port, ok, statusCode, err) {
		var line = host + ':' + port;
		console.log(alignString(line, 25) + ' => '
			+ (ok ? 'Found a valid proxy' : 'Invalid proxy, removed!') + ' (status: ' + statusCode + ', err: ' + err + ')');
		if ( statusCode !== 200 || !ok ) {
			removeLineFromFile('proxies.txt', line);
		}
	}
);