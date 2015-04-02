var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    req.flash('test', 'it worked');
    res.render('index', { title: 'Express' });
});

module.exports = router;
