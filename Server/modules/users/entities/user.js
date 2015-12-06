/**
 * Created by Elias on 12/4/2015.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId
    , Crypto = require('crypto');
module.exports = function () {
    var UserSchema = new Schema({
        _id: {type: ObjectId}
        , password: {type: String, required: true}
        , name: {type: String}
        , salt: {type: String}
    })
    UserSchema.pre('save', function (next) {
        var user = this;
        if (!user._id)user._id = mongoose.Types.ObjectId();
        //only hash the password if it has been modified or new
        if (!user.isModified('password'))return next();

        if (user.password.length > 20) {
            return next(new Error('The password is too long'));
        }

        //genereate salt
        Crypto.randomBytes(256 / 8, function (err, buff) {
            user.salt = buff.toString('hex');
            //set password
            user.password = Crypto.pbkdf2(user.password, user.salt, 473, 512, function (err, hashedPass) {
                if (err)return next(err);
                user.password = hashedPass.toString('binary');
                next();
            });
        });
    });
    mongoose.model('User', UserSchema);


}()
