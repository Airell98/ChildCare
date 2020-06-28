
const jwt = require('jsonwebtoken');

const SECRETKEY = "for-development" ;

function jwtVerify(param){
  return jwt.verify(param, SECRETKEY);
}


module.exports = jwtVerify
=======
const jwt = require('jsonwebtoken');

const SECRETKEY = process.env.SECRETKEY;

function jsonWebTokenVerify(param){
  return jwt.verify(param, SECRETKEY);
}


module.exports = jsonWebTokenVerify