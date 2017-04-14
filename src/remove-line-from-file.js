var fs = require('fs');
var replace = require('str-replace');

module.exports = function(file, line) {
  var contents = fs.readFileSync(file, 'utf-8');
  var replacedContents = replace('\n' + line).from(contents).with('');
  if (replacedContents === line) {
    replacedContents = '';
  }
  fs.writeFileSync(file, replacedContents);
};