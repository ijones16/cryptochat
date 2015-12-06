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
User = mongoose.model('User');
mongoose.connection.on('connected', function () {
    logger.info('Mongoose Connected', {time: new Date(), code: 'M3'});
});

var user1 = process.argv[2]
var user2 = process.argv[3]
var testUsers = []
User.findOne({name: user1}, function(err, user){
    if(err) return err;
     testUsers.push(user._id);
})
User.findOne({name: user2}, function(err, user){
    if(err) return err;
    testUsers.push(user._id);
})
for (var i = 0; i < 20; i++) {
    conversationController.addConversation({
        name: 'Test convo',
        messages: [{text: 'test at test at test', name: 'elias'}, {text: 'test at test t', name: 'ian'}],
        messageCount: 2,
        users: testUsers
    }, function (err, item) {
        if (err) return err;
        console.log("added convo")
    })
}
/**
 * Created by Elias on 12/5/2015.
 */
