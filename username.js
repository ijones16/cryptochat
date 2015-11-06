var express = require('express');
var fs = require('fs');

var User = require('./db').User;

var router = express.Router({
    mergeParams: true
});

// logs any request in the app
router.use(function (req, res, next) {
    console.log(req.method, 'for', req.params.username);
    next();
});

router.get('/', function (req, res) {
    var username = req.params.username;
    User.findOne({username: username}, function (err, user){
        res.render('user', {
            user: user,
            address: user.location
        })
    });
});


router.put('/', function (req, res) {
    var username = req.params.username;
    User.findOneAndUpdate({username: username}, {location: req.body}, function (err, user){
        res.end();
    })
});

router.delete('/', function (req, res) {
    var username = req.params.username;
    User.findOneAndRemove({username: username}, function(err, user){
        res.sendStatus(200);
    });
});

module.exports = router;
