var React = require('react');
var History = require('react-router').History;

var Logout = React.createClass({
    mixins: [History],

    handleLogout: function(){
        if(localStorage.getItem('uId')) localStorage.removeItem('uId');
        if(localStorage.getItem('cId')) localStorage.removeItem('cId');
        if(localStorage.getItem('username')) localStorage.removeItem('username');
        if(localStorage.getItem('showLogout')) localStorage.removeItem('showLogout');

        this.history.pushState(null , "/");
    },

    render: function(){
        return (
            <button style={{ marginBottom: 10, marginLeft: 5 }} className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
        )
    }
});

module.exports = Logout;