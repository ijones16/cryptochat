var React = require('react');
require('./ContactList.css');

var ContactsList = React.createClass({

    render: function(){

        var conversations = this.props.conversations.map(function(conversation, index){
            return <li
                className="list-group-item contact-list pointer"
                key={index}
                onClick={this.props.handleClick.bind(null, conversation.name, conversation._id, index)}>
                {conversation.name}
                 </li>
        }, this);
        return (
            <div className="col-sm-12">
                <ul>
                    {conversations}
                </ul>

            </div>
        );
    }
});

module.exports = ContactsList;