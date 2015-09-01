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
  },

  render: function () {

    let self = this;

    let PeripheralsList = [];
    this.state.peripherals.forEach(function (peripheral, key) {
      let Peripheral = (
        <EddystoneListItem
        peripheral={peripheral}
        onRow={self._onEdit.bind(null, peripheral, key)}
        onButton={self._onChangeStatus.bind(null, peripheral)}
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
    this.setState({ peripheral: Erm.getNewPeripheral(), uuid: uuidgen.v4() } );
    this.refs.PeripheralView.show();
  },

  _onEdit: function (peripheral, uuid) {
    this.setState({ peripheral: peripheral, uuid: uuid } );
    this.refs.PeripheralView.show();
  },

  _onDialogSubmit: function () {
    if(Erm.isValidPeripheral(this.state.peripheral)) {

      let uuid = this.state.uuid;
      let peripherals = this.state.peripherals;
      let peripheral = this.state.peripheral;

      if(peripherals.has(uuid)) {
        console.log('exists so deleting');
        peripherals.delete(uuid);
      }

      peripherals.set(uuid, peripheral);
      this.setState({ peripherals: peripherals });

      this.refs.PeripheralView.dismiss();
    }
  },

  _onChangeStatus: function (peripheral) {
    console.log('_onChangeStatus not implemented yet');
  },

  _onVariableChange: function (variable, value) {
    let peripheral = Erm.getValidatedPeripheral(this.state.peripheral, variable, value);

    this.setState(peripheral);
  }

});

module.exports = App;
