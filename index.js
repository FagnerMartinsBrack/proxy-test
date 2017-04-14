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
      console.log(alignString(line, 25) + ' => '
        + (ok ? 'Found a valid proxy' : 'Invalid proxy, removed!') + ' (status: ' + statusCode + ', err: ' + err + ')');
      const proxyContentsBeforeRemovingLine = fs.readFileSync('proxies.txt', { encoding: 'UTF-8' })
      // Connection timeout, not reading timeout
      if (err && err.code === 'ETIMEDOUT' && err.connect === true) {
        removeLineFromFile('proxies.txt', line);
      }
      // else if ( statusCode !== 200 || !ok ) {
      //     removeLineFromFile('proxies.txt', line);
      // }
      const ips = proxyContentsBeforeRemovingLine.split('\n')
      // console.log('Finished line: ' + line + ' inside the list: ' + ips)
      if (ips.indexOf(line) === ips.length - 1) {
        console.log('Starting over after reaching EOF at: ', line);
        startOver()
      }
    }
  );
}

startOver()