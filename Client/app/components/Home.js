var React = require('react');
var Login = require('./Login');

var Home = React.createClass({
    render: function(){
        return (
            <div className="container">
                <h2>About Crypto Chat:</h2>
                <p>
                    Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium.
                </p>
                <div>
                    <Login/>
                </div>
            </div>



        )
    }
});

module.exports = Home;