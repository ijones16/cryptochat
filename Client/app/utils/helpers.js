var axios = require('axios');
var host = 'http://localhost:5656';

var helpers = {
    newUser: function(username, password){
        axios.post(host + '/users/',  {
            name: username,
            password: password
        })
        .then(function(response){
            console.log(response);
        })
        .catch(function(response){
            console.log(response);
        });
    },

    userLogin: function(username, password){
        return axios.get(host + '/users/login/' + username, {
                name: username,
                password: password
            })

    },

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