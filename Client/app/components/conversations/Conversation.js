var React             = require('react');
var ConversationList  = require('./ConversationList');
var ConversationInput = require('./ConversationInput');
var helpers           = require('../../utils/helpers');

var Conversation = React.createClass({
    getInitialState: function(){
        return {messages: []}
    },

    componentDidMount: function(){
        helpers.getConversation(this.props.params.conversation)
            .then(function(dataObj){
                this.setState({
                    messages: dataObj.messages,
                });
            }.bind(this));
    },

    render: function(){
        var conversationName = this.props.params.conversation;
        return (
            <div className="col-sm-12">
                <div>{conversationName} Conversation:</div>
                <ConversationList messages={this.state.messages}/>
                <ConversationInput/>
            </div>
        );
    }
});

module.exports = Conversation;