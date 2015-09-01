'use strict';

var React = require('react/addons');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();

var TextField = mui.TextField;
var SelectField = mui.SelectField;
var Tabs = mui.Tabs;
var Tab = mui.Tab;

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

  propTypes: {
    onVariableChange: React.PropTypes.func.isRequired
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
      { value: this.props.type },
      React.createElement(
        Tab,
        { onActive: this._onActive.bind(null, 'type'), label: 'url', value: 'url' },
        React.createElement(TextField, {
          floatingLabelText: 'Device Name',
          value: this.props.name,
          errorText: this.props.nameErrorText,
          onChange: this._onTextField.bind(null, 'name') }),
        React.createElement(SelectField, {
          floatingLabelText: 'Device State',
          value: this.props.status,
          valueMember: 'value',
          displayMember: 'display',
          menuItems: deviceStates,
          onChange: this._onSelectField.bind(null, 'status') }),
        React.createElement(TextField, {
          floatingLabelText: 'URL',
          value: this.props.url,
          errorText: this.props.urlError,
          onChange: this._onTextField.bind(null, 'url') }),
        React.createElement(TextField, {
          floatingLabelText: 'Telemetry Count',
          value: this.props.tlmCount,
          errorText: this.props.telemetryCountError,
          onChange: this._onTextField.bind(null, 'tlmCount') }),
        React.createElement(TextField, {
          floatingLabelText: 'Telemetry Period',
          value: this.props.tlmPeriod,
          errorText: this.props.telemetryPeriodError,
          onChange: this._onTextField.bind(null, 'tlmPeriod') }),
        React.createElement(TextField, {
          floatingLabelText: 'Battery',
          value: this.props.battery,
          onChange: this._onTextField.bind(null, 'battery') }),
        React.createElement('br', null),
        React.createElement(TextField, {
          floatingLabelText: 'Temperature',
          value: this.props.temperature,
          onChange: this._onTextField.bind(null, 'temperature') })
      ),
      React.createElement(
        Tab,
        { onActive: this._onActive.bind(null, 'type'), label: 'uid', value: 'uid' },
        React.createElement(TextField, {
          floatingLabelText: 'Device Name',
          value: this.props.name,
          errorText: this.props.nameErrorText,
          onChange: this._onTextField.bind(null, 'name') }),
        React.createElement(SelectField, {
          floatingLabelText: 'Device State',
          value: this.props.status,
          valueMember: 'value',
          displayMember: 'display',
          menuItems: deviceStates,
          onChange: this._onSelectField.bind(null, 'status') }),
        React.createElement(TextField, {
          floatingLabelText: 'Namespace Id',
          value: this.props.namespaceId,
          errorText: this.props.namespaceIdError,
          onChange: this._onTextField.bind(null, 'namespaceId') }),
        React.createElement(TextField, {
          floatingLabelText: 'Instance Id',
          value: this.props.instanceId,
          errorText: this.props.instanceIdError,
          onChange: this._onTextField.bind(null, 'instanceId') }),
        React.createElement(TextField, {
          floatingLabelText: 'Telemetry Count',
          value: this.props.tlmCount,
          errorText: this.props.tlmCountError,
          onChange: this._onTextField.bind(null, 'tlmCount') }),
        React.createElement(TextField, {
          floatingLabelText: 'Telemetry Period',
          value: this.props.tlmPeriod,
          errorText: this.props.tlmPeriodError,
          onChange: this._onTextField.bind(null, 'tlmPeriod') }),
        React.createElement(TextField, {
          floatingLabelText: 'Battery',
          value: this.props.battery,
          errorText: this.props.batteryError,
          onChange: this._onTextField.bind(null, 'battery') }),
        React.createElement('br', null),
        React.createElement(TextField, {
          floatingLabelText: 'Temperature',
          value: this.props.temperature,
          errorText: this.props.temperatureError,
          onChange: this._onTextField.bind(null, 'temperature') }),
        React.createElement('br', null)
      )
    );
  },

  _onTextField: function _onTextField(variable, event) {
    this.props.onVariableChange(variable, event.target.value);
  },

  _onSelectField: function _onSelectField(variable, event, selectedIndex, menuItem) {
    this.props.onVariableChange(menuItem.text);
  },

  _onActive: function _onActive(variable, tab) {
    this.props.onVariableChange(variable, tab.props.label);
  }

});

module.exports = EddystoneAdd;