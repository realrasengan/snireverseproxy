const util = require('./util.js');

function isTLS(chunk) {
  switch(chunk[0]) {
    case 17:
    case 23:
    case 14:
    case 22:
    case 21:
    case 20:
      if(parseInt(chunk[1]) === 3 || parseInt(chunk[2]) > 1)
        return true;
    default:
      return false;
  }
}
module.exports = { isTLS };

