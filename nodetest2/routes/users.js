

var express = require('express');
var router = express.Router();
var app = express();
var http = require('http').Server(app);
var User = require('../models/user')
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var recommendAnime = require('../public/Parsers/recommendAnimeOnce.js')
var searchResults = require('../public/Parsers/searchParser.js')

router.use(express.static(__dirname + '/public/Parsers'));
router.get('/auth', function (req, res) {
    
    res.sendFile(path.resolve('public/Parsers/recommendAnimeOnce.html'));
    /*var fs = require("fs");
    var filename = "../public/parsers/recommendAnimeOnce.html";
    
    function start(resp) {
        resp.writeHead(200, {
            "Content-Type": "text/html"
        });
        fs.readFile(filename, "utf8", function (err, data) {
            if (err) throw err;
            resp.write(data);
            resp.end();
        });
    }*/
});
/*
 * Would import the anime from the user's watched anime list
router.get('/import/', function (req, res) {
    var db = req.db
    var i = 0;

    for (i; listOfAnime[i] != null; i++) {
        db.collection('userlist').remove({ watchedAnime : { animeName: listOfAnime[i] }, username:req.user });
        db.collection('userlist').update(
            { username: req.user },
     {
                $addToSet: {
                    watchedAnime: {
                        animeName: listOfAnime[i]
                    }
                }
            },

        function (error, result) {
                
                res.redirect('/profile');
            });
    }

})
    */

/*
 * Used to get the user sign up page
 */
router.get('/signup', function (req, res) {
    res.render('signup.jade', { message : req.flash('message') });
    
})

/*
 * Used to create a user in the database
 */
router.post('/signup', function (req, res) {
    var db = req.db;
    
    db.collection('userlist').insert(req.body, function (err, result) {
        
        res.render('index', { title: 'Recommend me anime' });
    });
});

/*
 * GET userlist.
 */
router.get('/userlist', function (req, res) {
    var db = req.db;
    db.collection('userlist').find().toArray(function (err, items) {
        res.json(items);
    });
});


/*
 * POST to adduser.
 */
router.post('/adduser', function (req, res) {
    var db = req.db;

    var body = req.body.username
    console.log("User name = " + body);

    
    db.collection('userlist').insert(req.body, function (err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
        res.render('index', { title: 'Recommend me anime' });
    });
 
    
    
});

/*
 * POST to addanime.
 */
router.post('/addanime', function (req, res) {
    var db = req.db;
    var username = req.user
    var anime = req.body.animeName
    var genre = req.body.genre
    console.log("User name = " + username + "\nAnime: = " + anime);


    db.collection('userlist').update(
        { username: username },
     {
            $addToSet: {
                watchedAnime: {
                    animeName: anime,
                    genre : genre
                }
            }
        },

        function (error, result) {
            
            res.redirect('/profile');
        });
    

});

/*
 * DELETE to deleteuser
 */
/*router.delete('/deleteuser/:id', function (req, res) {
    var db = req.db;
    var user_id = req.params.id;
    db.collection('userlist').removeById(user_id, function (error, result) {
        res.send((result === 1) ? { msg: '' } : { msg: 'error: ' + error });
    });
});
*/

/*
 * Used for when logins fail
 */

router.get('/loginFailure' , function (req, res, next) {
    req.flash('message', 'Invalid username or password');
 //   console.log('message: ' + req.flash('message'));
    res.render('index.jade', { message : req.flash('message') });
    
});





/*
 * Used to authenticate user
 */
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/loginFailure',
    failureFlash: true
}));

/*
 * Displays profile page
 */
router.get('/profile', isLoggedIn, function (req, res, next) {

    db.collection('userlist').findOne({ username: user },function (err, results) {
        console.log(results); // output all records
        
        var tableContent = ''
        
        if (results.watchedAnime != null) {
            for (i = 0; results.watchedAnime[i] != null; i++) {
                tableContent += '<tr>';
                tableContent += '<td>' + results.watchedAnime[i].animeName + '</td>';
                tableContent += '<td>' + results.watchedAnime[i].genre + '</td>';
                tableContent += '</tr>';
            }
        }
        
        console.log("Table content : " + tableContent);
        
        var data = JSON.stringify(tableContent);
        data = data.substring(1, data.length - 1);
        
        console.log("Data : " + data);

        res.render('profile', { user : results, data : data });
    });
    
});

/*
 * Is used to check if user is authenticated
 */
function isLoggedIn(req, res, next) {
    
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    
    // if they aren't redirect them to the home page
    res.redirect('/');
}

router.post('/search', function (req, res) {
    var anime = req.body.anime;
    console.log("Made it to search : " + anime);
});

module.exports = router;