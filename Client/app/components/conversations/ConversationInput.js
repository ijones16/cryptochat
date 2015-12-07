var React   = require('react');
var helpers = require('../../utils/helpers');

var ConverstationInput = React.createClass({
    handleSubmit: function(){
        var cId = localStorage.getItem('cId');
        var textInput = this.refs.userInput.value;
        this.refs.userInput.value = '';
        helpers.postMessage(textInput, this.props.user,  cId);
    },
    render: function(){
        return (
            <div className="col-sm-12">
                <form onSubmit={this.handleSubmit}>
                    <input className="form-control" ref="userInput" placeholder="enter a message..."></input>
                </form>
            </div>
        );
    }
});

module.exports = ConverstationInput;