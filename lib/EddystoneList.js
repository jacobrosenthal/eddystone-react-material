'use strict';

var React = require('react/addons');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

var List = mui.List;
var ListItem = mui.ListItem;
var Dialog = mui.Dialog;

var DeviceBluetooth = require('material-ui/lib/svg-icons/device/bluetooth');

var EddystoneAdd = require('./EddystoneAdd');

var EddystoneList = React.createClass({
  displayName: 'EddystoneList',

  propTypes: {
    onSubmit: React.PropTypes.func.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      devices: this.props.peripherals || [],
      device: {}
    };
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
    var _this = this;

    //Standard Actions
    var standardActions = [{ text: 'Cancel' }, { text: 'Submit', onTouchTap: this.props.onSubmit, ref: 'submit' }];

    var self = this;

    var containerStyle = {
      textAlign: 'left'
    };

    var emptyStyle = {
      color: Colors.minBlack,
      fontSize: 24,
      margin: 'auto',
      position: 'absolute',
      top: '50%',
      left: '40%' //just need to properly size this..
    };

    var Devices = undefined;
    if (this.state.devices.length > 0) {
      (function () {
        var i = 0;
        var devicesList = _this.state.devices.map(function (device) {
          var url = 'URL: ' + device.url;
          var uid = 'UID: ' + device.namespaceId + device.instanceId;
          return React.createElement(ListItem, {
            onClick: self._editDevice.bind(null, device),
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
            secondaryTextLines: 2,
            key: i++ });
        });
        Devices = React.createElement(
          List,
          null,
          devicesList
        );
      })();
    } else {
      Devices = React.createElement(
        'span',
        { style: emptyStyle },
        'no devices found'
      );
    }

    return React.createElement(
      'div',
      { style: containerStyle },
      Devices,
      React.createElement(
        Dialog,
        {
          ref: 'EddystoneAdd',
          autoDetectWindowHeight: true, autoScrollBodyContent: true,
          title: 'Edit Device',
          actions: standardActions,
          actionFocus: 'submit' },
        React.createElement(EddystoneAdd, this.state.device)
      )
    );
  },

  _editDevice: function _editDevice(device) {
    this.setState({ device: device });
    this.refs.EddystoneAdd.show();
  }

});

module.exports = EddystoneList;