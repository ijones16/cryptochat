var React             = require('react');
var ConversationList  = require('./ConversationList');
var ConversationInput = require('./ConversationInput');
var helpers           = require('../../utils/helpers');

var Conversation = React.createClass({
    getInitialState: function(){
        return {messages: []}
    },

    componentDidMount: function(){
        var cId = localStorage.getItem('cId');
        helpers.getConversation(cId)
            .then(function(response){
                console.log(response);
                this.setState({
                    messages: response.data[0].messages
                });
            }.bind(this));
    },

    render: function(){
        var conversationName = this.props.params.conversation;
        return (
            <div className="col-sm-12">
                <div className="text-center">{conversationName} Conversation:</div>
                <ConversationList messages={this.state.messages}/>
                <ConversationInput/>
            </div>
        );
    }
});

module.exports = Conversation;