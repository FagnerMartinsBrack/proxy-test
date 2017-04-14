var removeLineFromFile = require("../src/remove-line-from-file");
var fs = require('fs');
var expect = require('expect.js');

describe("remove-line-from-file", function() {
  it("should remove", function() {
    fs.writeFileSync('test/placeholder.txt', 'line1\nline2\nline3');
    removeLineFromFile('test/placeholder.txt', 'line2');
    expect(fs.readFileSync('test/placeholder.txt', 'utf-8')).to.be('line1\nline3');
  });
  it("removes a single line", function() {
    fs.writeFileSync('test/placeholder.txt', 'line1');
    removeLineFromFile('test/placeholder.txt', 'line1');
    expect(fs.readFileSync('test/placeholder.txt', 'utf-8')).to.be('');
  })
});