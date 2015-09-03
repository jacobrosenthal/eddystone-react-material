'use strict';

var React = require('react/addons');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();

var ListItem = mui.ListItem;
var IconButton = mui.IconButton;

var ToggleUnchecked = require('material-ui/lib/svg-icons/toggle/radio-button-unchecked');
var ToggleChecked = require('material-ui/lib/svg-icons/toggle/radio-button-checked');

var EddystoneListItem = React.createClass({
  displayName: 'EddystoneListItem',

  propTypes: {
    onButton: React.PropTypes.func.isRequired,
    onRow: React.PropTypes.func.isRequired,
    peripheral: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function render() {
    var peripheral = this.props.peripheral;
    var url = 'URL: ' + peripheral.url;
    var uid = 'UID: ' + peripheral.namespaceId + peripheral.instanceId;

    // context problems stopping from bringing in elements to render so for now
    // genercize button  so could be used as something other than enable
    var DisableButton = React.createElement(
      IconButton,
      {
        tooltip: 'Disable',
        onTouchTap: this.props.onButton },
      React.createElement(ToggleChecked, null)
    );

    var EnableButton = React.createElement(
      IconButton,
      {
        tooltip: 'Enable',
        onTouchTap: this.props.onButton },
      React.createElement(ToggleUnchecked, null)
    );

    return React.createElement(ListItem, {
      rightIconButton: peripheral.advertising ? DisableButton : EnableButton,
      onTouchTap: this.props.onRow,
      primaryText: React.createElement(
        'span',
        null,
        peripheral.name,
        ' - ',
        peripheral.status,
        ' - ',
        peripheral.advertising ? '' : 'not',
        ' advertising'
      ),
      secondaryText: React.createElement(
        'p',
        null,
        peripheral.type === 'url' ? url : uid,
        React.createElement('br', null),
        'battery:',
        peripheral.battery,
        ' - temp:',
        peripheral.temperature
      ),
      secondaryTextLines: 2 });
  }

});

module.exports = EddystoneListItem;