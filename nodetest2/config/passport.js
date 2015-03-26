// config/passport.js

var LocalStrategy = require("passport-local").Strategy;

var User = require("../models/user");

model.exports = function (passport) {

    passport.serealiseUser(function (user, donw) {
        done(null, user.id);
    });

    passport.deserealizeUser(function (user_id, done) {
        User.findById(user_id, function (error, user) {
            done(error, user);

        });
    });

    passport.use("local-signup", new LocalStrategy({
        usernameField: "userName",
        passwordField: "password",
        passReqToCallback: true
    },
        function (req, userName, password, done) {

            process.nextTick(function () {

                User.findOne({ "local.userName": userName }, function (error, user) {

                    if (error)
                        return done(error);

                    if (user) {
                        return done(null, false, req.flash("signUpError", "That username has already been signed up"));
                    } else {
                        var newUser = new User();

                        newUser.local.userName = userName;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function (error) {
                            if (error)
                                throw error;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));
};