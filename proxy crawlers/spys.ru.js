// Example: http://spys.ru/free-proxy-list/BR/

var arrayify = function(args) {
  return [].slice.call(args);
};

var elements = arrayify(document.getElementsByClassName("spy14"));

var ips = elements
  .filter((element) => !!element.innerText.match(/[0-9]+:[0-9]+$/))
  .map((element) => element.innerText)
  .join("<br>")

var openWindow = window.open('placeholder window', '_blank');
openWindow.document.write(ips);