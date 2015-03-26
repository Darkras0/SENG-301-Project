// models/user.js

var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var userSchema = mongoose.Schema({

    local: {
        userName: String,
        password: String,
        anime: {
            name: String,
            genre: String
        }
    }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

};

userSchema.methods.validPass = function (password) {
    return bcrypt.compareSync(password, this.localpassword);

};

module.exports = mongoose.model('User', userSchema);