var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    encrypted_password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: false,
        lowercase: true
    },
    name: String
});

mongoose.model('users', UserSchema);
