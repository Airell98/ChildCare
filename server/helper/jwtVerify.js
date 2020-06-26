const jwt = require('jsonwebtoken');

const SECRETKEY = "for-development" ;

function jwtVerify(param){
  return jwt.verify(param, SECRETKEY);
}


module.exports = jwtVerify