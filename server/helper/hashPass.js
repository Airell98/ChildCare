const bcrypt = require("bcrypt");
let salt = bcrypt.genSaltSync(10);

function hashPass(value) {
  try {
    return bcrypt.hashSync(value.password, salt);
  } catch (error) {
    console.log(error);
  }
}

module.exports = hashPass;
