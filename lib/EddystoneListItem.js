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
    device: React.PropTypes.object.isRequired
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
    var device = this.props.device;
    var url = 'URL: ' + device.url;
    var uid = 'UID: ' + device.namespaceId + device.instanceId;

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
      rightIconButton: device.status === 'Out of Range' ? EnableButton : DisableButton,
      onTouchTap: this.props.onRow,
      primaryText: React.createElement(
        'span',
        null,
        device.name,
        ' - ',
        device.status
      ),
      leftIcon: React.createElement(DeviceBluetooth, null),
      secondaryText: React.createElement(
        'p',
        null,
        device.type === 'url' ? url : uid,
        React.createElement('br', null),
        'battery:',
        device.battery,
        ' - temp:',
        device.temperature
      ),
      secondaryTextLines: 2 });
  }

});

module.exports = EddystoneListItem;