'use strict';

var React = require('react/addons');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

var TextField = mui.TextField;
var SelectField = mui.SelectField;
var Tabs = mui.Tabs;
var Tab = mui.Tab;

var randomWords = require('random-words');

var deviceStates = [{
  display: 'Out of Range',
  value: 'Out of Range'
}, {
  display: 'Far',
  value: 'Far'
}, {
  display: 'Near',
  value: 'Near'
}, {
  display: 'Immediate',
  value: 'Immediate'
}];

var EddystoneAdd = React.createClass({
  displayName: 'EddystoneAdd',

  getInitialState: function getInitialState() {
    return {
      name: this.props.name || randomWords({ exactly: 2, join: ' ' }),
      status: this.props.status || 'Out of Range',
      nameErrorText: '',
      namespaceIdError: '',
      instanceIdError: '',
      tlmCount: this.props.tlmCount || 2,
      tlmPeriod: this.props.tlmPeriod || 10,
      namespaceId: this.props.namespaceId || 'ed8e1220eac38ac4f4c2',
      instanceId: this.props.instanceId || '000000000000',
      url: this.props.url || 'http://',
      type: this.props.type || 'url',
      temperature: this.props.temperature || '25',
      battery: this.props.battery || '100'
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

    return React.createElement(
      Tabs,
      { value: this.state.type },
      React.createElement(
        Tab,
        { onActive: this._onActive, label: 'url', value: 'url' },
        React.createElement(TextField, {
          floatingLabelText: 'Device Name',
          value: this.state.name,
          errorText: this.state.nameErrorText,
          onChange: this._onNameChange,
          ref: 'deviceName' }),
        React.createElement(SelectField, {
          floatingLabelText: 'Device State',
          value: this.state.status,
          onChange: this._onStatusChange,
          valueMember: 'value',
          displayMember: 'display',
          menuItems: deviceStates }),
        React.createElement(TextField, {
          floatingLabelText: 'URL',
          value: this.state.url,
          onChange: this._onURLChange }),
        React.createElement(TextField, {
          floatingLabelText: 'Telemetry Count',
          value: this.state.tlmCount,
          errorText: this.state.telemetryCountError,
          onChange: this._onTelemetryCount }),
        React.createElement(TextField, {
          floatingLabelText: 'Telemetry Period',
          value: this.state.tlmPeriod,
          errorText: this.state.telemetryPeriodError,
          onChange: this._onTelemetryPeriod }),
        React.createElement(TextField, {
          floatingLabelText: 'Battery',
          value: this.state.battery,
          onChange: this._onBattery }),
        React.createElement('br', null),
        React.createElement(TextField, {
          floatingLabelText: 'Temperature',
          value: this.state.temperature,
          onChange: this._onTemperature })
      ),
      React.createElement(
        Tab,
        { onActive: this._onActive, label: 'uid', value: 'uid' },
        React.createElement(TextField, {
          floatingLabelText: 'Device Name',
          value: this.state.name,
          errorText: this.state.nameErrorText,
          onChange: this._onNameChange,
          ref: 'deviceName' }),
        React.createElement(SelectField, {
          floatingLabelText: 'Device State',
          value: this.state.status,
          onChange: this._onStatusChange,
          valueMember: 'value',
          displayMember: 'display',
          menuItems: deviceStates }),
        React.createElement(TextField, {
          floatingLabelText: 'Namespace Id',
          value: this.state.namespaceId,
          errorText: this.state.namespaceIdError,
          onChange: this._onNamespaceIdChange }),
        React.createElement(TextField, {
          floatingLabelText: 'Instance Id',
          value: this.state.instanceId,
          errorText: this.state.instanceIdError,
          onChange: this._onInstanceIdChange }),
        React.createElement(TextField, {
          floatingLabelText: 'Telemetry Count',
          value: this.state.tlmCount,
          errorText: this.state.telemetryCountError,
          onChange: this._onTelemetryCount }),
        React.createElement(TextField, {
          floatingLabelText: 'Telemetry Period',
          value: this.state.tlmPeriod,
          errorText: this.state.telemetryPeriodError,
          onChange: this._onTelemetryPeriod }),
        React.createElement(TextField, {
          floatingLabelText: 'Battery',
          value: this.state.battery,
          onChange: this._onBattery }),
        React.createElement('br', null),
        React.createElement(TextField, {
          floatingLabelText: 'Temperature',
          value: this.state.temperature,
          onChange: this._onTemperature }),
        React.createElement('br', null)
      )
    );
  },

  _onNameChange: function _onNameChange(event) {
    if (!event.target.value) {
      this.setState({ name: event.target.value, nameErrorText: 'You must name your Device' });
    } else {
      this.setState({ name: event.target.value, nameErrorText: '' });
    }
  },

  _onStatusChange: function _onStatusChange(event, selectedIndex, menuItem) {
    this.setState({ status: menuItem.text });
  },

  _onTelemetryCount: function _onTelemetryCount(event) {
    if (!isNumber(event.target.value)) {
      this.setState({ tlmCount: event.target.value, telemetryCountError: 'Must be a number' });
    } else {
      this.setState({ tlmCount: event.target.value, telemetryCountError: '' });
    }
  },

  _onTelemetryPeriod: function _onTelemetryPeriod(event) {
    if (!isNumber(event.target.value)) {
      this.setState({ tlmPeriod: event.target.value, telemetryPeriodError: 'Must be a number' });
    } else {
      this.setState({ tlmPeriod: event.target.value, telemetryPeriodError: '' });
    }
  },

  _onURLChange: function _onURLChange(event) {
    this.setState({ url: event.target.value });
  },

  _onNamespaceIdChange: function _onNamespaceIdChange(event) {
    if (!event.target.value || event.target.value.length !== 20) {
      this.setState({ namespaceId: event.target.value, namespaceIdError: 'Must be 12 digits hex number' });
    } else {
      this.setState({ namespaceId: event.target.value, namespaceIdError: '' });
    }
  },

  _onInstanceIdChange: function _onInstanceIdChange(event) {
    if (!event.target.value || event.target.value.length !== 12) {
      this.setState({ instanceId: event.target.value, instanceIdError: 'Must be 12 digits hex number' });
    } else {
      this.setState({ instanceId: event.target.value, instanceIdError: '' });
    }
  },

  _onBattery: function _onBattery(event) {
    this.setState({ battery: event.target.value });
  },

  _onTemperature: function _onTemperature(event) {
    this.setState({ temperature: event.target.value });
  },

  _onActive: function _onActive(tab) {
    this.setState({ type: tab.props.label });
  }
});

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = EddystoneAdd;