/**
 * Created by Elias on 12/4/2015.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId
module.exports = function(){
    var MessageSchema = new Schema({
        text:{type:String}
       ,name:{type:String}
    });
     var ConversationSchema = new Schema({
         _id:{type: ObjectId}
         ,name:{type: String}
         ,messages:[MessageSchema]
         ,created: { type: Date, default:new Date() }
         ,messageCount: {type:Number, default: 0}
         ,users:[{type: ObjectId, ref :'User'}]
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
