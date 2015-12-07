var React = require('react');


var ConversationList = React.createClass({
    render: function(){
        var messages = this.props.messages.map(function(message, index){
            return <li
                className="list-group-item contact-list"
                key={index}>
                {message}
                </li>
        });
        return (
           <ul>
               {messages}
            </ul>
        );
    }
});

module.exports = ConversationList;