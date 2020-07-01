
const bcrypt = require('bcrypt')

function compareSyncBcrypt(pass1, pass2){
  return bcrypt.compareSync(pass1, pass2)
}

module.exports = compareSyncBcrypt