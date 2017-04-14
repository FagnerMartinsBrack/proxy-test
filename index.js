var proxyChecker = require('proxy-checker');
const fs = require('fs')
var alignString = require('./src/align-string');
var removeLineFromFile = require('./src/remove-line-from-file');
var configuration = JSON.parse(require('fs').readFileSync('configuration.json', 'utf-8'))

// To remove the timeout add the following line:
// var proxyRequest = request.defaults({
//  proxy: 'http://' + host + ':' + port,
//  timeout: 2 // in milliseconds <<<--- Add this line
//});
// ... in the node_modules/proxy-checker/index.js file
const startOver = function() {
  proxyChecker.checkProxiesFromFile(
    'proxies.txt', {
      url: configuration['blocked-url'],
      regex: new RegExp(configuration['regex-for-valid-response'])
    },
    // Callback function to be called after the check 
    function(host, port, ok, statusCode, err) {
      var line = host + ':' + port;
      let message = alignString(line, 25) + ' => '
      const proxyContentsBeforeRemovingLine = fs.readFileSync('proxies.txt', { encoding: 'UTF-8' })
      if (err && err.code === 'ETIMEDOUT' && err.connect === true) {
        // Connection timeout, not reading timeout
        message += 'Invalid proxy, removed!' + '(status: ' + statusCode + ', err: ' + err + ')'
        removeLineFromFile('proxies.txt', line);
      } else if (err && err.code === 'ECONNREFUSED') {
        // Connection refused
        message += 'Invalid proxy, removed!' + '(status: ' + statusCode + ', err: ' + err + ')'
        removeLineFromFile('proxies.txt', line);
      } else {
        message += 'Found a potentially valid proxy: ' + (err && err.code || '')
      }
      console.log(message);
      const ips = proxyContentsBeforeRemovingLine.split('\n')
      if (ips.indexOf(line) === ips.length - 1) {
        console.log('Starting over after reaching EOF at: ', line);
        startOver()
      }
    }
  );
}

startOver()