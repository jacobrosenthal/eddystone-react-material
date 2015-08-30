let React = require('react/addons');
let App = require('./App');

let injectTapEventPlugin = require('react-tap-event-plugin');

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

React.render(<App />, document.getElementById('root'));
