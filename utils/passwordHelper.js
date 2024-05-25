var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

function hashPassword(password){
    var hash = bcrypt.hashSync(password,salt);
    return hash;
}

function verifyPassword(password,hashedPassword){
    var isMatching = bcrypt.compareSync(password,hashedPassword);
    return isMatching;
}

module.exports = {hashPassword,verifyPassword};