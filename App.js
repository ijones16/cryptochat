var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var engines = require('consolidate');
var bodyParser = require('body-parser');

var User = require('./db').User;


// lets express know that handlebars is the view engine
app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');


// parses the http VERBS from the view
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    User.find({}, function (err, users){
        res.render('index', {users: users});
    });
});


// returns any user at this endpoint
app.get('/data/:username', function(req, res){
    var username = req.params.username;
    var readable = fs.createReadStream(('./users/' + username + '.json'));
    readable.pipe(res);
});

var userRouter = require('./username');
app.use('/:username', userRouter);

// handles an invalid username
app.get('/error/:username', function(req, res){
    res.status(404).send('404, User not found.');
});

var server = app.listen(3000, function () {
    console.log('Server running at http://localhost:' + server.address().port)
});




// routes interacting with the database, need to update them

//if ('development' == app.get('env')) {
//   //app.use(errorHandler);
//    mongoose.connect('mongodb://localhost/cryptochat');
//}
//
////load all files in models dir
//fs.readdirSync(__dirname + '/models').forEach(function(filename) {
//    if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
//});
//
//app.get('/users', function(req, res) {
//    mongoose.model('users').find(function(err, users) {
//        res.send(users);
//    });
//});
//
//app.get('/messages', function(req, res) {
//    mongoose.model('messages').find(function(err, messages) {
//        res.send(messages);
//    });
//});
