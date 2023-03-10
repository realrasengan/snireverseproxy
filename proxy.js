const net = require('net');
const util = require('./util.js');
const names = require('./names.js');
const tls = require('./tls.js');

function proxy(client, config) {
  client.relay={};
  client.name = "";
  client.on('data', (data) => {
    let nameFunction=names.getNameFromChunk;

    if(tls.isTLS(data))
      nameFunction = names.getNameFromTLSChunk;

    if(client.name==="") {
      client.name = nameFunction(data);
      client.relay = net.createConnection(client.localPort, config.host(client.name));
      client.relay.on('connect',() => {
        client.relay.write(data);
        client.relay.pipe(client);
      });
      client.relay.on('close', () => {
        client.end();
        client.relay.destroy();
      });
      client.relay.on('error', (err) => {
        console.log(err);
        client.end();
        client.relay.end();
      });
    }
    else
      client.relay.write(data);
  });
  client.on('close', () => {
    client.relay.end();
    client.destroy();
  });
  client.on('error', (err) => {
    console.log(err);
    client.relay.end();
    client.end();
  });
}
module.exports = proxy;
