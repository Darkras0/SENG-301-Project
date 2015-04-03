var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Recommend me anime' });
});

/*
router.get('/', function (req, res, next) {
    res.sendFile('login.html', { root: path.join(__dirname, '../../views') });
});*/
module.exports = router;
