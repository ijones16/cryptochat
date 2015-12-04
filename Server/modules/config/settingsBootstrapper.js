/**
 * Created by Elias on 12/4/2015.
 */
var fs = require('fs');
//var file = __dirname + '\\settings.json';
var file = (process.env.USERPROFILE ? process.env.USERPROFILE : process.env.HOME) + '/crypto_settings.json';
exports.loadSettings = function () {
    var data = require(file);
    return data;
}