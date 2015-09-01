let React = require('react/addons');
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();

let TextField = mui.TextField;
let SelectField = mui.SelectField;
let Tabs = mui.Tabs;
let Tab = mui.Tab;

let deviceStates = [
  {
    display: 'Out of Range',
    value: 'Out of Range'
   },
  {
    display: 'Far',
    value: 'Far'
  },
  {
    display: 'Near',
    value: 'Near'
  },
  {
    display: 'Immediate',
    value: 'Immediate'
  }
];

let EddystoneAdd = React.createClass({
  propTypes: {
    onVariableChange: React.PropTypes.func.isRequired
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function () {

    return (
      <Tabs value={this.props.type}>
        <Tab onActive={this._onActive.bind(null, 'type')} label='url' value='url' >
          <TextField
            floatingLabelText='Device Name'
            value={this.props.name}
            errorText={this.props.nameErrorText}
            onChange={this._onTextField.bind(null, 'name')}/>
          <SelectField
            floatingLabelText='Device State'
            value={this.props.status}
            valueMember='value'
            displayMember='display'
            menuItems={deviceStates}
            onChange={this._onSelectField.bind(null, 'status')}/>
          <TextField
            floatingLabelText='URL'
            value={this.props.url}
            errorText={this.props.urlError}
            onChange={this._onTextField.bind(null, 'url')}/>
          <TextField
            floatingLabelText='Telemetry Count'
            value={this.props.tlmCount}
            errorText={this.props.telemetryCountError}
            onChange={this._onTextField.bind(null, 'tlmCount')}/>
          <TextField
            floatingLabelText='Telemetry Period'
            value={this.props.tlmPeriod}
            errorText={this.props.telemetryPeriodError}
            onChange={this._onTextField.bind(null, 'tlmPeriod')}/>
          <TextField
            floatingLabelText='Battery'
            value={this.props.battery}
            onChange={this._onTextField.bind(null, 'battery')}/>
          <br/>
          <TextField
            floatingLabelText='Temperature'
            value={this.props.temperature}
            onChange={this._onTextField.bind(null, 'temperature')}/>
        </Tab>
        <Tab onActive={this._onActive.bind(null, 'type')} label='uid' value='uid'>
          <TextField
            floatingLabelText='Device Name'
            value={this.props.name}
            errorText={this.props.nameErrorText}
            onChange={this._onTextField.bind(null, 'name')}/>
          <SelectField
            floatingLabelText='Device State'
            value={this.props.status}
            valueMember='value'
            displayMember='display'
            menuItems={deviceStates}
            onChange={this._onSelectField.bind(null, 'status')}/>
          <TextField
            floatingLabelText='Namespace Id'
            value={this.props.namespaceId}
            errorText={this.props.namespaceIdError}
            onChange={this._onTextField.bind(null, 'namespaceId')}/>
          <TextField
            floatingLabelText='Instance Id'
            value={this.props.instanceId}
            errorText={this.props.instanceIdError}
            onChange={this._onTextField.bind(null, 'instanceId')}/>
          <TextField
            floatingLabelText='Telemetry Count'
            value={this.props.tlmCount}
            errorText={this.props.tlmCountError}
            onChange={this._onTextField.bind(null, 'tlmCount')}/>
          <TextField
            floatingLabelText='Telemetry Period'
            value={this.props.tlmPeriod}
            errorText={this.props.tlmPeriodError}
            onChange={this._onTextField.bind(null, 'tlmPeriod')}/>
          <TextField
            floatingLabelText='Battery'
            value={this.props.battery}
            errorText={this.props.batteryError}
            onChange={this._onTextField.bind(null, 'battery')}/>
          <br/>
          <TextField
            floatingLabelText='Temperature'
            value={this.props.temperature}
            errorText={this.props.temperatureError}
            onChange={this._onTextField.bind(null, 'temperature')}/>
          <br/>
        </Tab>
      </Tabs>
      );
  },

  _onTextField: function (variable, event) {
    this.props.onVariableChange(variable, event.target.value);
  },

  _onSelectField: function (variable, event, selectedIndex, menuItem) {
    this.props.onVariableChange(menuItem.text);
  },

  _onActive: function (variable, tab) {
    this.props.onVariableChange(variable, tab.props.label);
  }

});

module.exports = EddystoneAdd;
