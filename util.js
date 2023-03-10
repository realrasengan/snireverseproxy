function byte(piece) {
  let b = piece.toString(16);
  return (b.length<2?'0'+b:b);
}
function bytesubstr(bytes,start,end) {
  if(start<0) start=0;
  if(end>bytes.length) end=bytes.length;

  let retval="";
  for(let x=start;x<=end;x++)
    retval+=byte(bytes[x]);

  return retval;
}
function substr(bytes,start,end) {
  if(start<0) start=0;
  if(end>bytes.length) end=bytes.length;

  let retval="";
  for(let x=start;x<=end;x++)
    retval+=String.fromCharCode(bytes[x]);

  return retval;
}

module.exports = { byte, bytesubstr, substr }

