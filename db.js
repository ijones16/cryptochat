var uri = 'mongodb://localhost:27017/cryptochat';

var mongoose = require('mongoose');
mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(callback){
    console.log('yay!');
});

var userSchema = mongoose.Schema({
   username: String,
    gender: String,
    name: {
        title: String,
        first: String,
        last: String,
        full: String
    },
    location:{
        street: String,
        city: String,
        State: String,
        zip: Number
    }
});

exports.User = mongoose.model('User', userSchema);
