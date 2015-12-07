/**
 * Created by Elias on 12/5/2015.
 */
require('../entities/conversations');
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
     Conversation.findOne({_id: props.headers.cid}, function(err, item){
        if(err) return next(err);
         item.messageCount++;
         item.messages.push({text: props.headers.message, name: props.headers.name});
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
exports.getConversations = function(uid, next){
    var convos = []
    Conversation.find({users: {"$in" : [uid] }}, function(err, conversations){
        if(err) return next(err);
        async.eachSeries(conversations, function(item, cb){
            var ob = {_id: item._id, name: item.name}
            convos.push(ob);
            cb()

        }, function finalizer(err){
            if(err) return next(err);
            return next(null, convos)
        })
    })
}
exports.getConversation = function(cid, next){
    Conversation.find({_id: cid}, function(err, conversation){
        if(err) return next(err);
        return next(null, conversation);
    })
}