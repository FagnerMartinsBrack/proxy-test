// Example: http://spys.ru/free-proxy-list/BR/

var arrayify = function(args) {
  return [].slice.call(args);
};

// Less is better
var LATENCY_LIMIT = 5;
var validRows = [].slice.call(document.querySelectorAll('.spy1xx, .spy1x'))
  .filter((row) => !!row.querySelector('td').innerText.match(/[0-9]+:[0-9]+$/))
  .filter((row) => {
    const latency = +row.querySelectorAll('td')[5].innerText
    return latency <= LATENCY_LIMIT
  })

var ips = validRows
  .map((row) => {
    // return '# Latency: ' + row.querySelectorAll('td')[5].innerText +
    //   '<br>' + row.querySelector('td font.spy14').innerText
    return row.querySelector('td font.spy14').innerText
  })
  .join("<br>")

console.log(ips)

var openWindow = window.open('placeholder window', '_blank');
openWindow.document.write(ips);