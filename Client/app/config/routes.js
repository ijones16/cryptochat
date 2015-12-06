var React        = require('react');
var Main         = require('../components/Main');
var Home         = require('../components/Home');
var Contacts     = require ('../components/contacts/Contacts');
var Conversation = require('../components/conversations/Conversation');
var Router       = require('react-router');
var IndexRoute   = Router.IndexRoute;
var Route        = Router.Route;

module.exports = (
    <Route path="/" component={Main}>
        <Route path="contacts/:username" component={Contacts}/>
        <Route path="contacts/:username/conversation/:conversation" component={Conversation}/>
        <IndexRoute component={Home}/>
    </Route>
);