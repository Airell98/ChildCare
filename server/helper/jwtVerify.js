const jwt = require('jsonwebtoken');

const SECRETKEY = "for-development" ;

function jsonWebTokenVerify(param){
  return jwt.verify(param, SECRETKEY);
}


module.exports = jsonWebTokenVerify