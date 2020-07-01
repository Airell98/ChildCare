const bcrypt = require("bcrypt");

function hashPass(value) {
const salt = bcrypt.genSaltSync(10);
  try {
    return bcrypt.hashSync(value.password, salt);
  } catch (error) {
    console.log(error);
  }
}

module.exports = hashPass;
