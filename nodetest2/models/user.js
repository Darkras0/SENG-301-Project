var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
    fullname: String,
    location: String,
    age: Number,
    gender: String,
    watchedAnime: {
        animeName: [String],
        genre: [String]
    }
     
});

//var User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User',userSchema);