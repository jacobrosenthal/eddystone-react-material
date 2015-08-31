let React = require('react/addons');
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();

let TextField = mui.TextField;
let SelectField = mui.SelectField;
let Tabs = mui.Tabs;
let Tab = mui.Tab;

let randomWords = require('random-words');

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
  getInitialState: function () {
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

  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function () {

    return (
      <Tabs value={this.state.type}>
        <Tab onActive={this._onActive} label='url' value='url' >
          <TextField
            floatingLabelText='Device Name'
            value={this.state.name}
            errorText={this.state.nameErrorText}
            onChange={this._onNameChange}
            ref='deviceName'/>
          <SelectField
            floatingLabelText='Device State'
            value={this.state.status}
            onChange={this._onStatusChange}
            valueMember='value'
            displayMember='display'
            menuItems={deviceStates}/>
          <TextField
            floatingLabelText='URL'
            value={this.state.url}
            onChange={this._onURLChange}/>
          <TextField
            floatingLabelText='Telemetry Count'
            value={this.state.tlmCount}
            errorText={this.state.telemetryCountError}
            onChange={this._onTelemetryCount}/>
          <TextField
            floatingLabelText='Telemetry Period'
            value={this.state.tlmPeriod}
            errorText={this.state.telemetryPeriodError}
            onChange={this._onTelemetryPeriod}/>
          <TextField
            floatingLabelText='Battery'
            value={this.state.battery}
            onChange={this._onBattery}/>
          <br/>
          <TextField
            floatingLabelText='Temperature'
            value={this.state.temperature}
            onChange={this._onTemperature}/>
        </Tab>
        <Tab onActive={this._onActive} label='uid' value='uid'>
          <TextField
            floatingLabelText='Device Name'
            value={this.state.name}
            errorText={this.state.nameErrorText}
            onChange={this._onNameChange}
            ref='deviceName'/>
          <SelectField
            floatingLabelText='Device State'
            value={this.state.status}
            onChange={this._onStatusChange}
            valueMember='value'
            displayMember='display'
            menuItems={deviceStates}/>
          <TextField
            floatingLabelText='Namespace Id'
            value={this.state.namespaceId}
            errorText={this.state.namespaceIdError}
            onChange={this._onNamespaceIdChange}/>
          <TextField
            floatingLabelText='Instance Id'
            value={this.state.instanceId}
            errorText={this.state.instanceIdError}
            onChange={this._onInstanceIdChange}/>
          <TextField
            floatingLabelText='Telemetry Count'
            value={this.state.tlmCount}
            errorText={this.state.telemetryCountError}
            onChange={this._onTelemetryCount}/>
          <TextField
            floatingLabelText='Telemetry Period'
            value={this.state.tlmPeriod}
            errorText={this.state.telemetryPeriodError}
            onChange={this._onTelemetryPeriod}/>
          <TextField
            floatingLabelText='Battery'
            value={this.state.battery}
            onChange={this._onBattery}/>
          <br/>
          <TextField
            floatingLabelText='Temperature'
            value={this.state.temperature}
            onChange={this._onTemperature}/>
          <br/>
        </Tab>
      </Tabs>
      );
  },

  _onNameChange: function (event) {
    if(!event.target.value){
      this.setState({ name: event.target.value, nameErrorText: 'You must name your Device' } );
    }else {
      this.setState({ name: event.target.value, nameErrorText: '' } );
    }
  },

  _onStatusChange: function (event, selectedIndex, menuItem) {
    this.setState({ status: menuItem.text} );
  },

  _onTelemetryCount: function (event) {
    if(!isNumber(event.target.value)){
      this.setState({ tlmCount: event.target.value, telemetryCountError: 'Must be a number' } );
    } else {
      this.setState({ tlmCount: event.target.value, telemetryCountError: '' } );
    }
  },

  _onTelemetryPeriod: function (event) {
    if(!isNumber(event.target.value)){
      this.setState({ tlmPeriod: event.target.value, telemetryPeriodError: 'Must be a number' } );
    } else {
      this.setState({ tlmPeriod: event.target.value, telemetryPeriodError: '' } );
    }
  },

  _onURLChange: function (event) {
    this.setState({ url: event.target.value });
  },

  _onNamespaceIdChange: function (event) {
    if(!event.target.value || event.target.value.length !== 20) {
      this.setState({ namespaceId: event.target.value, namespaceIdError: 'Must be 12 digits hex number' });
    }else {
      this.setState({ namespaceId: event.target.value, namespaceIdError: '' });
    }
  },

  _onInstanceIdChange: function (event) {
    if(!event.target.value || event.target.value.length !== 12) {
      this.setState({ instanceId: event.target.value, instanceIdError: 'Must be 12 digits hex number' });
    }else {
      this.setState({ instanceId: event.target.value, instanceIdError: '' });
    }
  },

  _onBattery: function (event) {
    this.setState({ battery: event.target.value });
  },

  _onTemperature: function (event) {
    this.setState({ temperature: event.target.value });
  },

  _onActive: function (tab) {
    this.setState({ type: tab.props.label });
  }
});

function isNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = EddystoneAdd;
