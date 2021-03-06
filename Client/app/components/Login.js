var React   = require('react');
var History = require('react-router').History;
var helpers = require('../utils/helpers');

var Login = React.createClass({
    mixins: [History],

    handleLogin: function(e){
        e.preventDefault();

        var username = this.refs.logUsername.value;
        var password = this.refs.logPassword.value;
        this.refs.logUsername.value = '';
        this.refs.logPassword.value = '';
        var self = this;
        // log in logic
        helpers.userLogin(username, password)
        .then(function(response){
            console.log(response);
            console.log(response.data._id);
           if(response.status === 200){
               localStorage.setItem('uId', response.data._id);
               localStorage.setItem('username', response.data.name);
               localStorage.setItem('showLogout', true);
               self.history.pushState(null , "contacts/" + username);
           } else{
               console.log('user shouldnt log in');
           }


        })
        .catch(function(response){
            console.log("error: " + response);
        });


    },
    handleRegister: function(e){
        e.preventDefault();
        var username = this.refs.regUsername.value;
        var password = this.refs.regPassword.value;
        this.refs.regUsername.value = '';
        this.refs.regPassword.value = '';

        helpers.newUser(username, password);

    },
    render: function(){
        return (
            <div className="container">
                <div className="col-sm-5  well">
                    <h4 className="text-center">Login:</h4>
                    <form onSubmit={this.handleLogin}>
                        <div>
                            <span>username</span>
                            <input type="text" className="form-control" ref="logUsername"/>
                        </div>
                        <div>
                            <span>password</span>
                            <input type="password" className="form-control" ref="logPassword"/>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">Log in</button>
                        </div>
                    </form>
                </div>
                <div className="col-sm-5 col-sm-offset-1 well">
                    <h4 className="text-center">Register:</h4>
                    <form onSubmit={this.handleRegister}>
                        <div>
                            <span>username</span>
                            <input type="text" className="form-control" ref="regUsername"/>
                        </div>
                        <div>
                            <span>password</span>
                            <input type="password" className="form-control" ref="regPassword"/>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-success">Register</button>
                        </div>
                    </form>
                </div>
            </div>


        )
    }
});

module.exports = Login;