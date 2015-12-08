var React             = require('react');
var ConversationList  = require('./ConversationList');
var ConversationInput = require('./ConversationInput');
var helpers           = require('../../utils/helpers');
var BackToContactsBtn = require('../contacts/BackToContactsBtn');
require('./Conversation.css');

var Conversation = React.createClass({

    getInitialState: function(){
        return {
            messages: [],
            isCurrentUser: true,
            cId: localStorage.getItem('cId')
        }
    },

    componentWillMount: function(){
        this.setState({messages: []});
    },

    componentDidMount: function(){

        helpers.getConversation(this.state.cId)
            .then(function(response){
                this.setState({
                    messages: response.data[0].messages
                });
            }.bind(this));
    },


    //componentWillUpdate: function() {
    //    var node = this;
    //    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    //},
    //
    //componentDidUpdate: function() {
    //    if (this.shouldScrollBottom) {
    //        var node = this;
    //        node.scrollTop = node.scrollHeight
    //    }
    //},


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
            <div className="container conversation-container">
                <BackToContactsBtn />
                <div className="text-center">{conversationName} Conversation:</div>
                <div className="col-sm-12 conversation-items">
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