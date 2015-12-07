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
        return axios.post(host + '/users/login/' + username, {
                name: username,
                password: password
            })

    },

    getAllConversations: function (userId){
        return axios({
            url: host + "/conversations/",
            method: 'GET',
            headers: {
                uid: userId
            }
        });


    },

    getConversation: function (conversationId){
        return axios.get(host + "/conversations/" + conversationId);
    },

    postMessage: function (text, conversationId){
        console.log('this will post a new message to the conversation')
    }
};


module.exports = helpers;