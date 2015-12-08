var axios = require('axios');
var host = 'http://localhost:5656';

var helpers = {

    // Users
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
    findAllUsers: function(){
        return axios.get(host + '/users/');
    },
    findUser: function(name){
        return axios({
            url: host + '/users/' + name,
            method: 'GET',
            headers: {
                name: name
            }
        })

    },


    // Convos
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

    //users:[{type: ObjectId, ref :'User'}
    //messages:[MessageSchema]
    //name:{type: String}
    addConversation: function(name, messages, users){
        //return axios({
        //    url: host + "/conversations/",
        //    method: 'POST',
        //    body: {
        //        name: name,
        //        messages: messages,
        //        users: users
        //    }
        //})

        return axios.post(host + "/conversations/", {
            name: name,
            messages: messages,
            users: users
        })
    },

    // Messages
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