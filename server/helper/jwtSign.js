const jwt = require("jsonwebtoken");
const SECRETKEY = "for-development" ;

function jsonWebTokenSign(param) {
  const access_token = jwt.sign(
    { id: param.dataValues.id, email: param.dataValues.email },
    SECRETKEY
    );
    
  return access_token;
}

module.exports = jsonWebTokenSign;
