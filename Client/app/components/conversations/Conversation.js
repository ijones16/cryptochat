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
            .then(function(response){
                this.setState({
                    messages: response.messages,
                });
            }.bind(this));

        //helpers.getAllConversations(userId)
        //    .then(function(response){
        //        console.log(response);
        //        this.setState({
        //            conversations: response.data
        //        })
        //    }.bind(this));
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