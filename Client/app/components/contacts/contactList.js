var React = require('react');

var ContactsList = React.createClass({


    render: function(){

        var friends = this.props.friends.map(function(friend, index){
            return <li
                className="list-group-item"
                key={index}
                onClick={this.props.handleClick.bind(null, friend, index)}>
                {friend} </li>
        }, this);
        return (
            <div className="col-sm-12">
                <ul>
                    {friends}
                </ul>

            </div>
        );
    }
});

module.exports = ContactsList;