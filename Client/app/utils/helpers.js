var axios = require('axios');

var helpers = {
    getAllConversations: function (userId){
        console.log('cant get conversations for ' + userId + " yet");
        //return axios.get('ip' + userId);
    },
    getConversation: function (conversationId){
        console.log('cant get single conversation yet');
        //return axios.get('ip' + conversationId);
    },
    postMessage: function (text, conversationId){
        console.log('this will post a new message to the conversation')
    }
};


module.exports = helpers;