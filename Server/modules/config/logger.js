/**
 * Created by Elias on 12/4/2015.
 */
var winston = require('winston');
var expressWinston = require('../custom-node_modules/express-winston')
expressWinston.requestWhitelist=['url', 'method', 'httpVersion', 'originalUrl', 'query']
var MongoDB = require('winston-mongodb').MongoDB;

var myCustomLevels = {
    levels:{
        'login':0,
        'usage':1,
        'info':2,
        'error':3,
        'warn':4,
        'badrequest':5,
        'unauthorized':6
    },
    colors:{
        'login':'green',
        'usage':'blue',
        'info':'white',
        'error':'red',
        'warn':'yellow',
        'badrequest':'yellow',
        'unauthorized':'yellow'
    }
}

exports.logger = new (winston.Logger)({
    levels: myCustomLevels.levels,
    colors: myCustomLevels.colors,
    transports: [
        new winston.transports.Console({level:'login', colorize:true, prettyPrint:true}),
        /*new winston.transports.MongoDB({
         'username':settings.winston.logging.username,
         'password':settings.winston.logging.password,
         'host':settings.winston.logging.host,
         'port':settings.winston.logging.port,
         'db':settings.winston.logging.dbname,
         'storeHost':true,
         level:'login'
         })*/
    ]
});

/*
 exports.usage = new expressWinston.logger({
 transports: [
 new winston.transports.MongoDB({
 'username':settings.winston.usage.username,
 'password':settings.winston.usage.password,
 'host':settings.winston.usage.host,
 'port':settings.winston.usage.port,
 'db':settings.winston.usage.dbname,
 'storeHost':true

 })
 ],
 meta:true,
 //be sure that it won't crash the server trying to get a uID
 msg:"{{req.uInfo ? req.uInfo.uId : 'no-uID'}} @ {{req.connection.remoteAddress}}",
 colorStatus:true
 });*/
