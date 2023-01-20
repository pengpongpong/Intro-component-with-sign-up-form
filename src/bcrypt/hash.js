const bcrypt = require("bcrypt")

export default function hashPass(unhashPass) {
    return bcrypt.hash(unhashPass, 10).then(function(hash) {
        return hash;
    })
}