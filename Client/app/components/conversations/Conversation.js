var React             = require('react');
var ConversationList  = require('./ConversationList');
var ConversationInput = require('./ConversationInput');
var helpers           = require('../../utils/helpers');

var Conversation = React.createClass({

    render: function(){
        var conversationName = this.props.params.conversation;
        return (
            <div className="col-sm-12">
                <div>{conversationName} Conversation:</div>
                <ConversationList/>
                <ConversationInput/>
            </div>
        );
    }
});

module.exports = Conversation;