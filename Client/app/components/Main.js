var React   = require('react');
var Logout  = require('./Logout');
var helpers = require('../utils/helpers');
var History = require('react-router').History;
require('./NavStyle.css');


var Main = React.createClass({
    mixins: [History],
    handleSearch: function(){
        this.history.pushState(null , "search/all");
    },
    render: function(){
        return (
            <div className="main-container">
                <nav className="navbar navbar-default" role="navigation">
                    <div className="col-sm-12" style={{marginTop: 15}}>
                        Cryptochat
                        { localStorage.getItem('showLogout') ? <Buttons handleSearch={this.handleSearch}/> : null }
                    </div>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

var Buttons = React.createClass({
    render: function(){
        return(
            <div className="float-nav">
                <button onClick={this.props.handleSearch} className="btn btn-primary" style={{marginBottom: 10, marginLeft: 10 }}>Find All Users</button>
                <Logout />
            </div>
        )
    }
});

module.exports = Main;