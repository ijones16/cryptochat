var React         = require('react');
var Main          = require('../components/Main');
var Home          = require('../components/Home');
var Contacts      = require ('../components/contacts/Contacts');
var Conversations = require('../components/conversations/Conversations');
var Router        = require('react-router');
var IndexRoute    = Router.IndexRoute;
var Route         = Router.Route;

module.exports = (
    <Route path="/" component={Main}>
        <Route path="contacts/:username" component={Contacts}/>
        <Route path="contacts/:username/conversation/:friend" component={Conversations}/>
        <IndexRoute component={Home}/>
    </Route>
);