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
      peripherals: [
      { name: 'pumpkins', status: 'Immediate', type: 'uid', namespaceId: 'ed8e1220eac38ac4f4c2', instanceId: '000000000001', tlmCount: 2, tlmPeriod: 10, battery: 89, temperature: 25, device: null },
      { name: 'pumpkins2', status: 'Out of Range', type: 'uid', namespaceId: 'ed8e1220eac38ac4f4c2', instanceId: '000000000002', tlmCount: 2, tlmPeriod: 10, battery: 98, temperature: 25, device: null },
      { name: 'pumpkins3', status: 'Far', type: 'uid', namespaceId: 'ed8e1220eac38ac4f4c2', instanceId: '000000000003', tlmCount: 2, tlmPeriod: 10, battery: 78, temperature: 24, device: null },
      { name: 'pumpkins4', status: 'Out of Range', type: 'uid', namespaceId: 'ed8e1220eac38ac4f4c2', instanceId: '000000000004', tlmCount: 2, tlmPeriod: 10, battery: 94, temperature: 24, device: null },
      { name: 'pumpkins5', status: 'Out of Range', type: 'uid', namespaceId: 'ed8e1220eac38ac4f4c2', instanceId: '000000000005', tlmCount: 2, tlmPeriod: 10, battery: 99, temperature: 26, device: null },
      { name: 'pumpkins6', status: 'Immediate', type: 'url', url: 'http://www.google.com', tlmCount: 2, tlmPeriod: 10, battery: 77, temperature: 25, device: null }
      ],
      device: {}
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

    let devicesList = this.state.peripherals.map(function (device, index) {
      return (
        <EddystoneListItem
        device={device}
        onRow={self._onEditDevice.bind(null, device)}
        onButton={self._onChangeStatus.bind(null, device)}
        key={index}/>);
    });

    let Devices = (<List>{devicesList}</List>);
    let EmptyDevices = (<span style={emptyStyle}>no devices found</span>);

    //Standard Actions
    let standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit' }
    ];

    return (
      <div style={containerStyle}>
        <AppBar style={appBarStyle} showMenuIconButton={false} title='Visual Bleno'/>

        {this.state.peripherals.length > 0 ? Devices : EmptyDevices}

        <FloatingActionButton style={actionButtonStyle} onTouchTap={this._onAddDevice}>
          <ContentAdd/>
        </FloatingActionButton>

        <Dialog
          ref='DeviceView'
          autoDetectWindowHeight={true} autoScrollBodyContent={true}
          title='Device View'
          actions={standardActions}
          actionFocus='submit'>
          <EddystoneAdd {...this.state.device}/>
        </Dialog>
      </div>
    );
  },

  _onAddDevice: function () {
    this.setState({ device: null } );
    this.refs.DeviceView.show();
  },

  _onEditDevice: function (device) {
    this.setState({ device: device } );
    this.refs.DeviceView.show();
  },

  _onDialogSubmit: function () {
    this.refs.DeviceView.dismiss();
  },

  _onChangeStatus: function (device) {
    console.log('not yet implemented');
  },

});

module.exports = App;

