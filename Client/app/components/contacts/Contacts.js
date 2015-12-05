var React = require('react');
var Router = require('react-router');
var ContactList = require('./ContactList');
var History = require('react-router').History;

var Contacts = React.createClass({
    mixins: [Router.State, History],
    getInitialState: function(){
        return {
            friends: ["thelias", "bridger", "zacjones"]
        }
    },
    handleClick: function(friend, index){
        this.history.pushState(null, "contacts/" + this.props.params.username + "/conversation/" + friend);
    },
    render: function(){
        var username = this.props.params.username;
        return (
            <div className="col-sm-12">
                <h4 className="text-center">
                    {username}'s Conversations:
                </h4>
                <ContactList username={username} friends={this.state.friends} handleClick={this.handleClick}/>
            </div>
        );
    }
});

module.exports = Contacts;