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
    findUser: function(name){
        return axios.get(host + "/users/" + name);

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
        return axios({
            url: host + "/conversations/" + conversationId,
            method: 'GET',
            headers: {
                cid: conversationId
            }
        });
    },

    postMessage: function (text, user, conversationId){
        return axios({
            url: host + "/conversations/" + conversationId,
            method: 'PUT',
            headers: {
                cid: conversationId,
                message: text,
                name: user
            }

        })
    }
};


module.exports = helpers;