
const bcrypt = require('bcrypt')
let salt = bcrypt.genSaltSync(10);

function hashPass(value){

  return bcrypt.hashSync(value.password, salt);
  
}

module.exports = hashPass