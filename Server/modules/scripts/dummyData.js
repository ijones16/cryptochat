settings = require('../config/settingsBootstrapper.js').loadSettings();
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
for (var i = 0; i < 20; i++) {
    conversationController.addConversation({
        name: 'Test convo',
        messages: [{text: 'test at test at test', name: 'elias'}, {text: 'test at test t', name: 'ian'}],
        messageCount: 2,
        users: ['5663c3d5649d120021a78fd8', '5663cc9a162371ec2f084e27']
    }, function (err, item) {
        if (err) return err;
        console.log("added convo")
    })
}
/**
 * Created by Elias on 12/5/2015.
 */
