var React             = require('react');
var ConversationList  = require('./ConversationList');
var ConversationInput = require('./ConversationInput');
var helpers           = require('../../utils/helpers');

var Conversation = React.createClass({

    getInitialState: function(){
        return {
            messages: [],
            isCurrentUser: true,
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
            <div className="container">
                <div className="text-center">{conversationName} Conversation:</div>
                <div className="col-sm-12">
                    <ConversationList
                        messages={this.state.messages}
                        isCurrentUser={this.state.isCurrentUser}
                        user={this.props.params.username}/>
                    <ConversationInput user={this.props.params.username} />
                </div>
            </div>
        );
    }
});

module.exports = Conversation;