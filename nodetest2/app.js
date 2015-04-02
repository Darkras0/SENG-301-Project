var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session')

mongoose.connect('mongodb://localhost:27017/nodetest2');

var mongooseDB = mongoose.connection;

mongooseDB.on('error', function (err) {
    console.log('connection error', err);
});
mongooseDB.once('open', function () {
    console.log('connected.');
});

// Database
var mongo = require('mongoskin');

var db = mongo.db("mongodb://localhost:27017/nodetest2", { native_parser: true });


var routes = require('./routes/index');
var users = require('./routes/users');
var User = require('./models/user.js');

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(session({ secret: 'secret' }, { cookie: { maxAge: 60000,   secure : false } }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());




passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        
        process.nextTick(function () {
            db.collection('userlist').findOne({ 'username': username },
		function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false);
                }
                if (user.password != password || password === '') {
                    return done(null, false);
                }
                return done(null, user);
            });
        });
    }
));

//Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
