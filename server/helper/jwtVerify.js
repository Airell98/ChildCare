const jwt = require('jsonwebtoken');

const SECRETKEY = process.env.SECRETKEY;

function jwtVerify(param){
  return jwt.verify(param, SECRETKEY);
}


module.exports = jwtVerify