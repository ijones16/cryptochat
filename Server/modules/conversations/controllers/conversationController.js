/**
 * Created by Elias on 12/5/2015.
 */
require('../entities/');
var mongoose = require('mongoose')
    , async = require('async')
    , _ = require('underscore')
    , Conversation = mongoose.model('Conversation');
exports.addConversation = function(props, next){
    props.messageCount = 0;
    var newConvo = new Conversation(props)
    newConvo.save(function(err, item){
        if(err) return next(err);
        next(null, item);
    })
}
exports.addMessageToConversation = function(props, next){
     Conversation.findOne({_id: props._id}, function(err, item){
        if(err) return next(err)
         item.messageCount++;
         item.messages.push(props.message);
         item.save(function (err, item1){
             if(err) return next(err);
             return next(null, item1);
         })
     })

}
exports.newMessage = function(props, next){
    Conversation.findOne({_id: props._id}, function(err, item){
          if(err) return next(err)
        return next(null, item.messageCount)
    })
}
exports.getConversations = function(props, next){
    Conversation.find({users: props.uId}, function(err, conversations){
        if(err) return next(err);
        return next(null, conversations);
    })
}
exports.getConversation = function(props, next){
    Conversation.find({_id: props._id}, function(err, conversation){
        if(err) return next(err);
        return next(null, conversation);
    })
}