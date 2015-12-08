var React = require('react');
require('./Conversation.css')


var ConversationList = React.createClass({
    render: function(){
        var messages = this.props.messages.map(function(message, index){
            var isCurrentUser;
            if (this.props.user === message.name){
                isCurrentUser = true;
            } else {
                isCurrentUser = false;
            }
            return <p
                key={index}
                className={isCurrentUser ? 'sent' : 'received'}>
                    {message.text}<br/>
                    <small>{message.name}</small>
                </p>
        }.bind(this));
        return (
            <div className="chatList">
                {messages}
            </div>
        );
    }
});

module.exports = ConversationList;