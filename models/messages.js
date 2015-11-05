var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messagesSchema = new Schema({
    content: String,
    user: {
        type: Schema.ObjectId,
        ref: 'users'
    }
});

mongoose.model('messages', messagesSchema);
