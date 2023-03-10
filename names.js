const util = require('./util.js');

function getNameFromChunk(chunk) {
  let regex = /Host: ([^\s]+)/ig
  return chunk.toString().match(regex)[0].substr(6);
}
function getNameFromTLSChunk(chunk) {
  let name="";

  let index=44;
  index+=parseInt(util.byte(chunk[43]),16);                   // session
  index+=parseInt(util.bytesubstr(chunk,index,index+1),16)+2; // cypher
  index+=parseInt(util.byte(chunk[index]),16)+1;              // compression methods

  let extensions_length = parseInt(util.bytesubstr(chunk,index,index+1),16);
  let extension_length=0;
  index+=2;
  for(let x=index;x<index+extensions_length;x+=extension_length) {
    let extension = util.bytesubstr(chunk,x,x+1);
    x+=2;
    extension_length = parseInt(util.bytesubstr(chunk,x,x+1),16);
    x+=2;
    if(extension=="0000") {
      x+=3;
      let name_length = parseInt(util.bytesubstr(chunk,x,x+1),16);
      x+=2;
      name = util.substr(chunk,x,x+name_length-1);
      break;
    }
  }
  return name;
}
module.exports = { getNameFromChunk, getNameFromTLSChunk };

