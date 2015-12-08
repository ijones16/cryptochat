var React             = require('react');
var BackToContactsBtn = require('./contacts/BackToContactsBtn');
var helpers           = require('../utils/helpers');
var History           = require('react-router').History;
var Modal             = require('react-modal');

var Search = React.createClass({
    mixins: [History],

    getInitialState(){
        return{
            users: [],
            modalIsOpen: false,
            friendName: "",
            friendId: ""
        };
    },

    openModal: function(friendName, friendId) {
        this.setState({friendName: friendName});
        this.setState({friendId: friendId});
        this.setState({modalIsOpen: true});

    },

    closeModal: function() {
        this.setState({friendName: ""});
        this.setState({friendId: ""});
        this.setState({modalIsOpen: false});
    },


    componentDidMount: function(){
        helpers.findAllUsers()
            .then(function(response){
                this.setState({
                    users: response.data
            });
        }.bind(this));

    },

    // Clicking a name will open a model
    handleNewConvo: function(e){
        e.preventDefault();

        var uId = localStorage.getItem('uId');
        var uname = localStorage.getItem('username');
        var friendId = this.state.friendId;


        //users:[{type: ObjectId, ref :'User'}
        var usersArr = [];
        usersArr.push(uId, friendId);

        //messages:[MessageSchema]
        //empty conversation to start out
        var messages = [];

        //name of conversation
        var convName = this.refs.convName.value;

        helpers.addConversation(convName, messages, usersArr)
            .then(function(response){
                if(response.status === 200){
                    this.setState({friendName: ""});
                    this.setState({friendId: ""});
                    this.history.pushState(null, "contacts/" + uname + "/conversation/" + convName);
                } else {
                    console.log("error: " + response);
                }
            }.bind(this));
    },
    render: function(){
        var self = this;
        var users = this.state.users.map(function(user, index){
           return <ListItem openModal={self.openModal} user={user} key={index}/>
        });


        return (
            <div className="col-sm-12">
                <BackToContactsBtn />
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyle}>
                    <div className="container">
                        <div className="span10">
                            <h1>New conversation with {this.state.friendName}</h1>
                            <form onSubmit={this.handleNewConvo}>
                                <div className="col-sm-5">
                                    <div>Name conversation:</div>
                                    <input type="text" className="form-control" ref="convName"/>
                                </div>
                                <div className="col-sm-11" style={{marginTop: 5}}>
                                    <button type="submit" className="btn btn-success" style={{marginRight: 10}}>Create</button>
                                    <button className="btn btn-danger" onClick={this.closeModal}>Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>

                <h2 className="text-center">Start a conversation: </h2>
                <ul>
                    {users}
                </ul>

            </div>
        )
    }
});

var customStyle = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
    },
    content : {
        position                   : 'absolute',
        top                        : '23%',
        left                       : '23%',
        right                      : '23%',
        bottom                     : '23%',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '20px'

    }
};

var ListItem = React.createClass({
   render: function(){
       return(
           <li
               className="list-group-item contact-list"
               key={this.props.key}
               onClick={this.props.openModal.bind(null, this.props.user.name, this.props.user._id)}>
               {this.props.user.name}
           </li>
       )
   }
});

module.exports = Search;