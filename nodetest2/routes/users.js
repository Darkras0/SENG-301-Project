var express = require('express');
var router = express.Router();

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
//    var body = req.body.username
 //   console.log("User name = " + body);

    
    db.collection('userlist').insert(req.body, function (err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
    
});

/*
 * POST to addanime.
 */
router.post('/addanime', function (req, res) {
    var db = req.db;
    var username = req.body.username
    var anime = req.body.anime
//    console.log("User name = " + username + "\nAnime: = " + anime);


    db.collection('userlist').update(
        { username: username },
        { $addToSet: { anime : anime } },
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

module.exports = router;
