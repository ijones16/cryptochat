var React = require('react');
var History = require('react-router').History;

var BackToContactsBtn = React.createClass({
    mixins: [History],

    handleClick: function(){
        var username = localStorage.getItem('username');
        this.history.pushState(null , "contacts/" + username);
    },

    render: function(){
        return(
            <a className="pointer" onClick={this.handleClick}>Return to Conversations Page</a>
        )
    }
});

module.exports = BackToContactsBtn;