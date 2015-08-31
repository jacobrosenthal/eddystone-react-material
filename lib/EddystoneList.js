'use strict';

var React = require('react/addons');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

var List = mui.List;
var Dialog = mui.Dialog;

var EddystoneListItem = require('./EddystoneListItem');
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
      var devicesList = this.state.devices.map(function (device, index) {
        return React.createElement(EddystoneListItem, {
          device: device,
          onClick: self._editDevice.bind(null, device),
          key: index });
      });
      Devices = React.createElement(
        List,
        null,
        devicesList
      );
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