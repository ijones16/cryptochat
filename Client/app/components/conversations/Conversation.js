var React             = require('react');
var ConversationList  = require('./ConversationList');
var ConversationInput = require('./ConversationInput');
var helpers           = require('../../utils/helpers');

var Conversation = React.createClass({

    getInitialState: function(){
        return {
            messages: [],
            cId: localStorage.getItem('cId')
        }
    },

    componentDidMount: function(){

        helpers.getConversation(this.state.cId)
            .then(function(response){
                this.setState({
                    messages: response.data[0].messages
                });
            }.bind(this));
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        console.log("query has run");
        helpers.getConversation(this.state.cId)
            .then(function(response){
                this.setState({
                    messages: response.data[0].messages
                });
            }.bind(this));
        return true;
    },

    render: function(){
        var conversationName = this.props.params.conversation;
        return (
            <div className="col-sm-12">
                <div className="text-center">{conversationName} Conversation:</div>
                <ConversationList messages={this.state.messages}/>
                <ConversationInput user={this.props.params.username}/>
            </div>
        );
    }
});

module.exports = Conversation;