var React = require('react');

var Main = React.createClass({
    render: function(){
        return (
            <div className="main-container">
                <nav className="navbar navbar-default" role="navigation">
                    <div className="col-sm-8 col-sm-offset-1" style={{marginTop: 15}}>
                        Cryptochat
                    </div>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

module.exports = Main;