var expect = require("expect.js");
var alignString = require("../src/align-string");

describe("align-string", function() {
  it("should align correctly", function() {
    expect(alignString("80", 6)).to.be("80    ");
  });
});