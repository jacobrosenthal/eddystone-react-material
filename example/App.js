let React = require('react/addons');
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;

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

let containerStyle = {
  textAlign: 'left'
};

let appBarStyle = {
  textAlign: 'left'
};

let actionButtonStyle = {
  margin: 'auto',
  position: 'absolute',
  top: '85%',
  left: '85%'
};

let emptyStyle = {
  color: Colors.minBlack,
  fontSize: 24,
  margin: 'auto',
  position: 'absolute',
  top: '50%',
  left: '40%' //just need to properly size this..
};


let App = React.createClass({
  getInitialState: function () {
    return {
      peripherals: new Map(),
      peripheral: {},
      uuid: ''
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
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });

    bleno.on('bleno advertisingStartError', function (error) {
      console.log('advertisingStartError', error);
    });

    bleno.on('bleno servicesSetError', function (error) {
      console.log('servicesSetError', error);
    });

    bleno.on('bleno error', function (error) {
      console.log('error', error);
    });

    bleno.on('stateChange', function (state) {
      console.log('bleno stateChange', state);
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
        onButton={self._onChangeStatus.bind(null, key)}
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

    return (
      <div style={containerStyle}>
        <AppBar style={appBarStyle} showMenuIconButton={false} title='Visual Bleno'/>

        {this.state.peripherals.size > 0 ? Peripherals : EmptyPeripherals}

        <FloatingActionButton style={actionButtonStyle} onTouchTap={this._onAdd}>
          <ContentAdd/>
        </FloatingActionButton>

        <Dialog
          ref='PeripheralView'
          autoDetectWindowHeight={true} autoScrollBodyContent={true}
          title='Peripheral View'
          actions={standardActions}
          actionFocus='submit'>
          <EddystoneAdd onVariableChange={this._onVariableChange} {...this.state.peripheral}/>
        </Dialog>
      </div>
    );
  },

  _onAdd: function () {
    let uuid = uuidgen.v4();
    console.log('_onAdd', uuid);

    this.setState({ peripheral: Erm.getNewPeripheral(), uuid: uuid } );
    this.refs.PeripheralView.show();
  },

  _onEdit: function (peripheral, uuid) {
    console.log('_onEdit', uuid);

    this.setState({ peripheral: peripheral, uuid: uuid } );
    this.refs.PeripheralView.show();
  },

  _onDialogSubmit: function () {
    let uuid = this.state.uuid;

    if(Erm.isValidPeripheral(this.state.peripheral)) {
      console.log('_onDialogSubmit', uuid, 'found valid');
      let peripheral = this.state.peripheral;

      //wipe out errors
      peripheral.errors = {};

      this._updatePeripheral(uuid, peripheral);
      this.refs.PeripheralView.dismiss();
    }else {
      console.log('_onDialogSubmit', uuid, 'found invalid');
    }
  },

  _onChangeStatus: function (uuid) {
    let peripheral = this.state.peripherals.get(uuid);
    console.log('_onChangeStatus', uuid, 'to', !peripheral.advertising);

    peripheral.advertising = !peripheral.advertising;
    this._updatePeripheral(uuid, peripheral);
  },

  _onUserButton: function (uuid) {
    console.log('_onUserButton depress', uuid);
    let self = this;

    let peripheral = this.state.peripherals.get(uuid);
    let oldBattery = peripheral.battery;
    peripheral.battery = 100;
    this._updatePeripheral(uuid, peripheral);

    setInterval(function () {
      console.log('_onUserButton release', uuid);

      peripheral.battery = oldBattery;
      self._updatePeripheral(uuid, peripheral);
    }, 200);
  },

  _onVariableChange: function (variable, value) {
    let peripheral = Erm.getValidatedPeripheral(this.state.peripheral, variable, value);

    this.setState(peripheral);
  },

  _updatePeripheral: function (uuid, peripheral) {
    console.log('_updatePeripheral', uuid);
    let peripherals = this.state.peripherals;

    // no way to update map? just delete existing then
    if(peripherals.has(uuid)) {
      peripherals.delete(uuid);
    }

    peripherals.set(uuid, peripheral);
    this.setState({ peripherals: peripherals });

    Erm.syncPeripheral(peripheral);
  }
});

module.exports = App;
