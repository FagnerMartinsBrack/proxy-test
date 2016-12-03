module.exports = function(string, charCount) {
  return string + " ".repeat(charCount - string.length);
};