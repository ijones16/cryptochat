require('../entities/user');
var mongoose = require('mongoose')
    , async = require('async')
    , _ = require('underscore')
    , Crypto = require('crypto')
    , User = mongoose.model('User');
exports.getUsers = function (props, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);
        return next(null, users)
    })
}
exports.addUser = function (props, next) {
    var dbuser = new User(props);
    dbuser.save(function (err, item) {
        if (err) return next(err);
        next(null, item);
    })
}
exports.login = function (user, next) {
    User.findOne({name: user.name}, function (err, dbuser) {
        if (err) return next(err);
        if(dbuser){
        user.password = Crypto.pbkdf2(user.password, dbuser.salt, 473, 512, function (err, hashedPass) {
            if (err) return next(err);
            user.password = hashedPass.toString('binary');
            if (dbuser.password == user.password) {
                return next(null, dbuser);
            }
            else {
                return next(null);
            }
        })
        }
        else{
            return next(null)
        }
    })
}
exports.findUser = function(props, next){
    user.find({name: props.name}, function(err, dbuser){
        if (err) return next(err);
        next(null, dbuser);
    })
}