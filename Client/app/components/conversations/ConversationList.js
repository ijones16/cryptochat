var React = require('react');


var ConversationList = React.createClass({
    render: function(){
        var messages = this.props.messages.map(function(message, index){
            return <li
                key={index}>
                <span>{message.name}: {message.text}</span>
                </li>
        });
        return (
            <div>
                <ul>
                    {messages}
                </ul>
            </div>
        );
    }
});

module.exports = ConversationList;