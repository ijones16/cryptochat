/**
 * Created by Elias on 12/4/2015.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId
    , UserSchema = require('../../users/entities/user.js')
module.exports = function(){
    var MessageSchema = new Schema({
      text:{type:String}
       ,name:{type:String}
    });
     var ConversationSchema = new Schema({
         _id:{type: ObjectId}
         ,messages:[MessageSchema]
         ,created: { type: Date, default:new Date() }
         ,messageCount: {type:Number}
         ,users:[UserSchema.UserSchema]
     })
    mongoose.model('Conversation', ConversationSchema);
    mongoose.model('Messages', MessageSchema);

    ConversationSchema.pre('save', function(next){
        var convo = this;
        if(!convo._id){
            var id = mongoose.Types.ObjectId();
            convo._id = id;
            convo._nucleus = id;
        }

        if(!convo.created)convo.created = new Date();
        next();
    })
}();
