settings = require('../config/settingsBootstrapper.js').loadSettings();
require('../users/entities/user');

var mongoose = require("mongoose");
var _logger = require('../config/logger.js');
logger = _logger.logger;
var connString = settings.mongo.connections;
var conversationController = require('../conversations/controllers/conversationController.js');
var connectionOptions = {}
//mongoose.set('debug', true);
var db = mongoose.connect(connString, connectionOptions);
// When successfully connected
mongoose.connection.on('connected', function () {
    logger.info('Mongoose Connected', {time: new Date(), code: 'M3'});
});
//parameters: node dummyData.js {existing user1} {existing user2}
var User = mongoose.model('User');
var user1 = process.argv[2]
var user2 = process.argv[3]
var testUsers = []

for (var i = 0; i < 20; i++) {
    conversationController.addConversation({
        name: 'Test convo',
        messages: [{text: 'test at test at test', name: 'elias'}, {text: 'test at test t', name: 'ian'}],
        messageCount: 2,
        users: ["5664cbded11f40bc4f96bc34", "5664cc0ed11f40bc4f96bc35" ]
    }, function (err, item) {
        if (err) return err;
        console.log("added convo")
    })
}
/**
 * Created by Elias on 12/5/2015.
 */
