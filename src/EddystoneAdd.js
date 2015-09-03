let React = require('react/addons');
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();

let TextField = mui.TextField;
let SelectField = mui.SelectField;
let Tabs = mui.Tabs;
let Tab = mui.Tab;
let Toggle = mui.Toggle;

let toggleStyle = {
  paddingTop: '20',
};

let deviceStates = [
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
    onVariableChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object.isRequired
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

    let SharedForm = (<span>
      <Toggle
        style={toggleStyle}
        label="Advertising Enabled"
        defaultToggled={this.props.advertising}
        onToggle={this._onSwitch.bind(null, 'advertising')}/>
      <TextField
        floatingLabelText='Device Name'
        value={this.props.name}
        errorText={this.props.errors.nameErrorText}
        onChange={this._onTextField.bind(null, 'name')}/>
      <SelectField
        floatingLabelText='Device State'
        value={this.props.status}
        valueMember='value'
        displayMember='display'
        menuItems={deviceStates}
        onChange={this._onSelectField.bind(null, 'status')}/>
      <TextField
        floatingLabelText='Telemetry Count'
        value={this.props.tlmCount}
        errorText={this.props.errors.telemetryCountError}
        onChange={this._onTextField.bind(null, 'tlmCount')}/>
      <TextField
        floatingLabelText='Telemetry Period'
        value={this.props.tlmPeriod}
        errorText={this.props.errors.telemetryPeriodError}
        onChange={this._onTextField.bind(null, 'tlmPeriod')}/>
      <TextField
        floatingLabelText='Battery'
        value={this.props.battery}
        onChange={this._onTextField.bind(null, 'battery')}/>
      <TextField
        floatingLabelText='Temperature'
        value={this.props.temperature}
        onChange={this._onTextField.bind(null, 'temperature')}/>
    </span>);

    return (
      <Tabs value={this.props.type}>
        <Tab onActive={this._onActive.bind(null, 'type')} label='url' value='url' >
          {SharedForm}
          <TextField
            floatingLabelText='URL'
            value={this.props.url}
            errorText={this.props.errors.urlError}
            onChange={this._onTextField.bind(null, 'url')}/>
        </Tab>
        <Tab onActive={this._onActive.bind(null, 'type')} label='uid' value='uid'>
          {SharedForm}
          <TextField
            floatingLabelText='Namespace Id'
            value={this.props.namespaceId}
            errorText={this.props.errors.namespaceIdError}
            onChange={this._onTextField.bind(null, 'namespaceId')}/>
          <TextField
            floatingLabelText='Instance Id'
            value={this.props.instanceId}
            errorText={this.props.errors.instanceIdError}
            onChange={this._onTextField.bind(null, 'instanceId')}/>
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
  },

  _onSwitch: function (variable, event, enabled) {
    this.props.onVariableChange(variable, enabled);
  }

});

module.exports = EddystoneAdd;
