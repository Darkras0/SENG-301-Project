var express = require('express');
var router = express.Router();
var User = require('../models/user')
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');



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
    });
   /*
   var addedUser = new User({
        username: req.body.username,
        email: req.body.email,
        fullname: req.body.fullname,
        age: req.body.age,
        location: req.body.location,
        gender: req.body.gender,
        watchedAnime: {
            animeName: "test",
            genre: "test" 
        }
    });
    
    console.log("Added user = " + addedUser);

    addedUser.save(function (err) {
        if (err) {
            console.log("not able to save: " + addedUser.username);
        } else {
            
            console.log('User saved successfully!');
        }
    });*/
    
    
});

/*
 * POST to addanime.
 */
router.post('/addanime', function (req, res) {
    var db = req.db;
    var username = req.body.username
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
            if (error) {
                res.send((result === 1) ? { msg: '' } : { msg: 'error: ' + error });
            }
        });


});

/*
 * DELETE to deleteuser
 */
router.delete('/deleteuser/:id', function (req, res) {
    var db = req.db;
    var user_id = req.params.id;
    db.collection('userlist').removeById(user_id, function (error, result) {
        res.send((result === 1) ? { msg: '' } : { msg: 'error: ' + error });
    });
});





router.get('/auth', function (req, res, next) {
    res.sendFile('login.html', { root: path.join(__dirname, '../views') });
});



router.get('/loginFailure' , function (req, res, next) {
    res.send("Failed authenticating");
});

router.get('/loginSuccess' , function (req, res, next) {
    res.send('Successfully authenticated');
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/loginFailure',
    failureFlash: true
}));

router.get('/profile', isLoggedIn, function (req, res, next) {
    var db = req.db
    var user = req.user
    var password = req.password



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

  /*  $(document).ready(function () {
        
          
        if (thisUserObject.watchedAnime != null) {
            for (i = 0; thisUserObject.watchedAnime[i] != null; i++) {
                tableContent += '<tr>';
                tableContent += '<td>' + myInfo.watchedAnime[i].animeName + '</td>';
                tableContent += '<td>' + myInfo.watchedAnime[i].genre + '</td>';
                tableContent += '</tr>';
            }
        }
        
        $('#watchedAnime table tbody').html(tableContent);
    })*/
    

    //console.log(myInfo);
 
    
});


function isLoggedIn(req, res, next) {
    
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    
    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;