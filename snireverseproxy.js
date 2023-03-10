const net = require('net');
const fs = require('fs');
var config = require('./config.js');
const proxy = require('./proxy.js');

let servers = [];
let sslPorts = config.ports();
sslPorts.forEach((p) => {
  let sslServer = net.createServer(_proxy);
  sslServer.listen(p);
  servers.push(sslServer);
});
let httpServer = net.createServer(_proxy)
httpServer.listen(80);

function _proxy(s) { proxy(s, config) }

process.on('uncaughtException', (err, origin) => { console.error(`${parseInt(Number(new Date()) / 1000)} # Serious problem (${origin}) - this should not happen but the snireverseproxy is still running. ${err.stack}`); });
process.on('SIGHUP',function() { config.sighup(); });
