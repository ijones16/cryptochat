var React       = require('react');
var Router      = require('react-router');
var ContactList = require('./ContactList');
var History     = require('react-router').History;
var helpers     = require('../../utils/helpers');

var Contacts = React.createClass({
    mixins: [Router.State, History],
    getInitialState: function(){
        return {
            conversations: []
        }
    },
    componentDidMount: function(){
        var userId = localStorage.getItem('uId');
        helpers.getAllConversations(userId)
            .then(function(response){
                console.log(response);
                this.setState({
                    conversations: response.data
                })
            }.bind(this));

    },
    handleClick: function(conversation, conversationId, index){
        localStorage.setItem('cId', conversationId);
        this.history.pushState(null, "contacts/" + this.props.params.username + "/conversation/" + conversation);
    },
    render: function(){
        var username = this.props.params.username;
        return (
            <div className="col-sm-12">
                <h4 className="text-center">
                    {username}'s Conversations:
                </h4>
                <ContactList
                    username={username}
                    conversations={this.state.conversations}
                    handleClick={this.handleClick}/>
            </div>
        );
    }
});

module.exports = Contacts;