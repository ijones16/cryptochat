var React = require('react');
var helpers = require('../utils/helpers');
var History = require('react-router').History;

var Search = React.createClass({
    mixins: [History],

    getInitialState(){
        return{
            users: []
        }
    },

    componentDidMount: function(){
        helpers.findAllUsers()
            .then(function(response){
                this.setState({
                    users: response.data
            });
        }.bind(this));

    },

    handleClick: function(friendName, friendId){
        var uId = localStorage.getItem('uId');
        var uname = localStorage.getItem('username');
        console.log(uname, uId);
        console.log(friendName, friendId);

        //users:[{type: ObjectId, ref :'User'}
        var usersArr = [];
        usersArr.push(uId, friendId);

        //messages:[MessageSchema]
        //empty conversation to start out
        var messages = [];

        //name of conversation
        var convName = "AnotherAwesomeConvo!!";

        helpers.addConversation(convName, messages, usersArr)
            .then(function(response){
                if(response.status === 200){
                    this.history.pushState(null, "contacts/" + uname + "/conversation/" + convName);
                } else {
                    console.log("error: " + response);
                }
            }.bind(this));
    },
    render: function(){
        var self = this;
        var users = this.state.users.map(function(user, index){
           return <ListItem handleClick={self.handleClick} user={user} key={index}/>
        });
        return (
            <div className="col-sm-12">
                <h2 className="text-center">Start a conversation: </h2>
                <ul>
                    {users}
                </ul>

            </div>
        )
    }
});

var ListItem = React.createClass({
   render: function(){
       return(
           <li
               className="list-group-item contact-list"
               key={this.props.key}
               onClick={this.props.handleClick.bind(null, this.props.user.name, this.props.user._id)}>
               {this.props.user.name}
           </li>
       )
   }
});

module.exports = Search;