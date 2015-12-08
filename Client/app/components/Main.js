var React   = require('react');
var Search  = require('./Search');
var helpers = require('../utils/helpers');
var History = require('react-router').History;


var Main = React.createClass({
    mixins: [History],
    handleSearch: function(){
        this.history.pushState(null , "search/all");
    },
    render: function(){
        return (
            <div className="main-container">
                <nav className="navbar navbar-default" role="navigation">
                    <div className="col-sm-8 col-sm-offset-1" style={{marginTop: 15}}>
                        Cryptochat
                    </div>
                    <form onSubmit={this.handleSearch}>
                        <button type="submit" className="btn btn-primary" style={{marginTop: 10}}>Find All Users</button>
                    </form>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

module.exports = Main;