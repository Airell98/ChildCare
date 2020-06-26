const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRETKEY || "for-development" ;

function jsonWebTokenSign(param) {
  const access_token = jwt.sign(
    { id: param.id, email: param.email },
    SECRETKEY
  );

  return access_token;
}

module.exports = jsonWebTokenSign;
