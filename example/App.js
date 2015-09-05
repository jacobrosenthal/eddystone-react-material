let React = require('react/addons');
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;

let Card = mui.Card;
let CardHeader = mui.CardHeader;
let CardText = mui.CardText;

let FloatingActionButton = mui.FloatingActionButton;
let AppBar = mui.AppBar;

let List = mui.List;
let Dialog = mui.Dialog;

let ContentAdd = require('material-ui/lib/svg-icons/content/add');

let Erm = require('../');
let EddystoneAdd = Erm.EddystoneAdd;
let EddystoneListItem = Erm.EddystoneListItem;

let bleno = require('bleno');
let uuidgen = require('uuid');

let appBarStyle = {
  paddingLeft: 72 // align with listitem text
};

let actionButtonStyle = {
  marginTop: -25, // align with bottom of appbar
  marginLeft: 8, // align with listitem icons
  zIndex: 6 // move above list item actions
};

let emptyStyle = {
  color: Colors.minBlack,
  fontSize: 24,
  // center vertically within the page
  // TODO: this needs work
  position: 'absolute',
  top: '50%',
  left: '40%'
};

let App = React.createClass({
  getInitialState: function () {
    return {
      peripherals: new Map(),
      peripheral: {},
      uuid: '',
      logs: []
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

  componentWillMount: function () {
    let self = this;

    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });

    bleno.on('advertisingStartError', function (error) {
      self._log('bleno advertisingStartError ' + error);
    });

    bleno.on('servicesSetError', function (error) {
      self._log('bleno servicesSetError ' + error);
    });

    bleno.on('xpcError', function (error) {
      self._log('bleno xpcError ' + error);
    });

    bleno.on('stateChange', function (state) {
      self._log('bleno stateChange ' + state);
    });
  },

  render: function () {
    let self = this;

    let PeripheralsList = [];
    this.state.peripherals.forEach(function (peripheral, key) {
      let Peripheral = (
        <EddystoneListItem
        peripheral={peripheral}
        onRow={self._onEdit.bind(null, peripheral, key)}
        onButton={self._onUserButton.bind(null, key)}
        key={key}/>);

      PeripheralsList.push(Peripheral);
    });

    let Peripherals = (<List>{PeripheralsList}</List>);
    let EmptyPeripherals = (<span style={emptyStyle}>no peripheral found</span>);

    //Standard Actions
    let standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit' }
    ];

    let visibleLogs = this.state.logs.length > 5 ? this.state.logs.slice(this.state.logs.length-5) : this.state.logs;

    return (
      <div>
        <AppBar style={appBarStyle} showMenuIconButton={false} title='Visual Bleno'/>

        <FloatingActionButton style={actionButtonStyle} onTouchTap={this._onAdd} mini={true}>
          <ContentAdd/>
        </FloatingActionButton>

        {this.state.peripherals.size > 0 ? Peripherals : EmptyPeripherals}

        <Dialog
          ref='PeripheralView'
          autoDetectWindowHeight={true} autoScrollBodyContent={true}
          title='Peripheral View'
          actions={standardActions}
          actionFocus='submit'>
          <EddystoneAdd onVariableChange={this._onVariableChange} {...this.state.peripheral}/>
        </Dialog>

        <Card initiallyExpanded={false}>
          <CardHeader
            title="Logs"
            showExpandableButton={true}/>
          <CardText expandable={true}>
            {visibleLogs.map((log, index) =>
              <p key={index}>{log}</p>
            )}
          </CardText>
        </Card>
      </div>
    );
  },

  _onAdd: function () {
    let uuid = uuidgen.v4();
    this._log('_onAdd ' + uuid);

    this.setState({ peripheral: Erm.getNewPeripheral(), uuid: uuid } );
    this.refs.PeripheralView.show();
  },

  _onEdit: function (peripheral, uuid) {
    this._log('_onEdit ' + uuid);

    this.setState({ peripheral: peripheral, uuid: uuid } );
    this.refs.PeripheralView.show();
  },

  _onDialogSubmit: function () {
    let uuid = this.state.uuid;

    if(Erm.isValidPeripheral(this.state.peripheral)) {
      this._log('_onDialogSubmit ' + uuid + ' found valid');
      let peripheral = this.state.peripheral;

      //wipe out errors
      peripheral.errors = {};

      this._updatePeripheral(uuid, peripheral);
      this.refs.PeripheralView.dismiss();
    }else {
      this._log('_onDialogSubmit ' + uuid + ' found invalid');
    }
  },

  _onChangeStatus: function (uuid) {
    let peripheral = this.state.peripherals.get(uuid);
    this._log('_onChangeStatus ' + uuid + ' to ' + !peripheral.advertising);

    peripheral.advertising = !peripheral.advertising;
    this._updatePeripheral(uuid, peripheral);
  },

  _onUserButton: function (uuid) {
    let self = this;
    this._log('_onUserButton depress ' + uuid);

    let peripheral = this.state.peripherals.get(uuid);
    let oldBattery = peripheral.battery;
    peripheral.battery = 100;
    this._updatePeripheral(uuid, peripheral);

    setTimeout(function () {
      self._log('_onUserButton release ' +  uuid);

      peripheral.battery = oldBattery;
      self._updatePeripheral(uuid, peripheral);
    }, 200);
  },

  _onVariableChange: function (variable, value) {
    let peripheral = Erm.getValidatedPeripheral(this.state.peripheral, variable, value);

    this.setState(peripheral);
  },

  _updatePeripheral: function (uuid, peripheral) {
    this._log('_updatePeripheral ' + uuid);
    let peripherals = this.state.peripherals;

    // no way to update map? just delete existing then
    if(peripherals.has(uuid)) {
      peripherals.delete(uuid);
    }

    peripherals.set(uuid, peripheral);
    this.setState({ peripherals: peripherals });

    Erm.syncPeripheral(peripheral);
  },

  _log: function (text) {
    this.setState({ logs: [ ...this.state.logs, text ] });
  }
});

module.exports = App;
