'use strict';

var React = require('react/addons');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();

var ListItem = mui.ListItem;

var DeviceBluetooth = require('material-ui/lib/svg-icons/device/bluetooth');

var EddystoneListItem = React.createClass({
  displayName: 'EddystoneListItem',

  propTypes: {
    onClick: React.PropTypes.func.isRequired,
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

    return React.createElement(ListItem, {
      onClick: this.props.onClick,
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