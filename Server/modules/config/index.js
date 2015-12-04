/**
 * Created by Elias on 12/4/2015.
 */
settings = require('./settingsBootstrapper.js').loadSettings();
var mongoose = require("mongoose");
var connString = settings.mongo.connections;
var _logger = require('./logger.js');
logger = _logger.logger;


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