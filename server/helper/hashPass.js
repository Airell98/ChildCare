const bcrypt = require("bcrypt");

function hashPass(value) {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(value.password, salt);
}

module.exports = hashPass;
