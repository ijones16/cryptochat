var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var _ = require('lodash');
var users = [];

var app = express();
app.set('port', process.env.PORT || 3000);

fs.readFile('users.json', {encoding: 'utf8'}, function (err, data){
    if (err) throw err;

    JSON.parse(data).forEach(function(user){
        user.name.full = _.startCase(user.name.first + ' ' + user.name.last);
        users.push(user);
    })
});

app.set('views', './views');
app.set('view engine', 'jade');


app.get('/', function(req, res){
    res.render('index', {users: users});
});

app.get('/:username', function(req, res){
    var username = req.params.username;
    res.send(username);
});

if ('development' == app.get('env')) {
   //app.use(errorHandler);
    mongoose.connect('mongodb://localhost/cryptochat');
}

//load all files in models dir
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

app.get('/users', function(req, res) {
    mongoose.model('users').find(function(err, users) {
        res.send(users);
    });
});

app.get('/messages', function(req, res) {
    mongoose.model('messages').find(function(err, messages) {
        res.send(messages);
    });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
