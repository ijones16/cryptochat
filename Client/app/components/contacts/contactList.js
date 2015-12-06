var React = require('react');

var ContactsList = React.createClass({

    render: function(){

        var conversations = this.props.conversations.map(function(conversation, index){
            return <li
                className="list-group-item contact-list"
                key={index}
                onClick={this.props.handleClick.bind(null, conversation, index)}>
                {conversation}
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