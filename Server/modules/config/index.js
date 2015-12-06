/**
 * Created by Elias on 12/4/2015.
 */
settings = require('./settingsBootstrapper.js').loadSettings();
var mongoose = require("mongoose");
var connString = settings.mongo.connections;
var _logger = require('./logger.js');
logger = _logger.logger;
var express = require('express');
var bodyParser = require('body-parser');
app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
//app.use(_logger.usage);



app.get('/', function(req,res){
    return res.status(200).send('Howdy');
});

console.log('Loading Entities...');
require('./entities');
console.log('Loading Routes...');
require('./routes');

var connectionOptions = {}

if(settings.mongo.replSet.isSet){
    connectionOptions.replset = {rs_name:settings.mongo.replSet.name, ssl: settings.mongo.useSSL, socketOptions:{keepAlive:1}}
}else{
    connectionOptions.server = {ssl: settings.mongo.useSSL, socketOptions:{keepAlive:1}}
}

if(settings.mongo.authentication.authenticate){
    connectionOptions.user = settings.mongo.authentication.username;
    connectionOptions.password = settings.mongo.authentication.password;
}
var db = mongoose.connect(connString, connectionOptions);

//mongoose.set('debug', true);

// When successfully connected
mongoose.connection.on('connected', function () {
    logger.info('Mongoose Connected', {time: new Date(), code:'M3'});
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    logger.error('Mongoose Error', {time: new Date(), err:err.toString(), code:'M0'});
    mongoose.connect(connString, function(err){
        if(err){
            logger.error('Mongoose Error', {time: new Date(), err:err.toString(), code:'M1'});
        }
    });

});

mongoose.connection.on('timeout', function(){
    logger.error('Mongoose Timeout', {time: new Date(), err:'Mongoose default connection has timed out!!!!!!', code:'M2'});
})

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    logger.error('Mongoose Disconnected', {time: new Date(), err:'Mongoose default connection has disconnected!!!!!!', code:'M2'});
});

mongoose.connection.on('reconnected', function(){
    logger.info('Mongoose Reconnected', {time: new Date(), code:'M3'});
})
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,bakon,ham,iohost,apphost');
    next();
});
app_process = app.listen(5656);
