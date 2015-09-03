'use strict';

var React = require('react/addons');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();

var TextField = mui.TextField;
var SelectField = mui.SelectField;
var Tabs = mui.Tabs;
var Tab = mui.Tab;

var deviceStates = [{
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
    onVariableChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object.isRequired
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

    var SharedForm = React.createElement(
      'span',
      null,
      React.createElement(TextField, {
        floatingLabelText: 'Device Name',
        value: this.props.name,
        errorText: this.props.errors.nameErrorText,
        onChange: this._onTextField.bind(null, 'name') }),
      React.createElement(SelectField, {
        floatingLabelText: 'Device State',
        value: this.props.status,
        valueMember: 'value',
        displayMember: 'display',
        menuItems: deviceStates,
        onChange: this._onSelectField.bind(null, 'status') }),
      React.createElement(TextField, {
        floatingLabelText: 'Telemetry Count',
        value: this.props.tlmCount,
        errorText: this.props.errors.telemetryCountError,
        onChange: this._onTextField.bind(null, 'tlmCount') }),
      React.createElement(TextField, {
        floatingLabelText: 'Telemetry Period',
        value: this.props.tlmPeriod,
        errorText: this.props.errors.telemetryPeriodError,
        onChange: this._onTextField.bind(null, 'tlmPeriod') }),
      React.createElement(TextField, {
        floatingLabelText: 'Battery',
        value: this.props.battery,
        onChange: this._onTextField.bind(null, 'battery') }),
      React.createElement(TextField, {
        floatingLabelText: 'Temperature',
        value: this.props.temperature,
        onChange: this._onTextField.bind(null, 'temperature') })
    );

    return React.createElement(
      Tabs,
      { value: this.props.type },
      React.createElement(
        Tab,
        { onActive: this._onActive.bind(null, 'type'), label: 'url', value: 'url' },
        SharedForm,
        React.createElement(TextField, {
          floatingLabelText: 'URL',
          value: this.props.url,
          errorText: this.props.errors.urlError,
          onChange: this._onTextField.bind(null, 'url') })
      ),
      React.createElement(
        Tab,
        { onActive: this._onActive.bind(null, 'type'), label: 'uid', value: 'uid' },
        SharedForm,
        React.createElement(TextField, {
          floatingLabelText: 'Namespace Id',
          value: this.props.namespaceId,
          errorText: this.props.errors.namespaceIdError,
          onChange: this._onTextField.bind(null, 'namespaceId') }),
        React.createElement(TextField, {
          floatingLabelText: 'Instance Id',
          value: this.props.instanceId,
          errorText: this.props.errors.instanceIdError,
          onChange: this._onTextField.bind(null, 'instanceId') }),
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