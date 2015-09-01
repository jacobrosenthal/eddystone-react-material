'use strict';

var React = require('react/addons');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();

var ListItem = mui.ListItem;
var IconButton = mui.IconButton;

var DeviceBluetooth = require('material-ui/lib/svg-icons/device/bluetooth');
var DeviceBluetoothDisabled = require('material-ui/lib/svg-icons/device/bluetooth-disabled');

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

    var EnableButton = React.createElement(
      IconButton,
      {
        tooltip: 'Enable',
        onTouchTap: this.props.onButton },
      React.createElement(DeviceBluetooth, null)
    );

    var DisableButton = React.createElement(
      IconButton,
      {
        tooltip: 'Disable',
        onTouchTap: this.props.onButton },
      React.createElement(DeviceBluetoothDisabled, null)
    );

    return React.createElement(ListItem, {
      rightIconButton: peripheral.status === 'Out of Range' ? EnableButton : DisableButton,
      onTouchTap: this.props.onRow,
      primaryText: React.createElement(
        'span',
        null,
        peripheral.name,
        ' - ',
        peripheral.status
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