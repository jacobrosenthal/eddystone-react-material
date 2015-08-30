let React = require('react/addons');
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;

let List = mui.List;
let ListItem = mui.ListItem;
let Dialog = mui.Dialog;

let DeviceBluetooth = require('material-ui/lib/svg-icons/device/bluetooth');

let EddystoneAdd = require('./EddystoneAdd');

let EddystoneList = React.createClass({
  getInitialState: function () {
    return {
      devices: this.props.peripherals || [],
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

  render: function () {

    //Standard Actions
    let standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit' }
    ];

    let self = this;

    let containerStyle = {
      textAlign: 'left'
    };

    let emptyStyle = {
      color: Colors.minBlack,
      fontSize: 24,
      margin: 'auto',
      position: 'absolute',
      top: '50%',
      left: '40%' //just need to properly size this..
    };

    let Devices;
    if(this.state.devices.length > 0) {
      let i = 0;
      let devicesList = this.state.devices.map(function (device) {
        let url = 'URL: ' + device.url;
        let uid = 'UID: ' + device.namespaceId + device.instanceId;
        return (
          <ListItem
          onClick={self._editDevice.bind(null, device)}
          primaryText={ <span>{device.name} - {device.status}</span>}
          leftIcon={<DeviceBluetooth />}
          secondaryText={
            <p>
              {device.type === 'url' ? url : uid }
              <br/>
              battery:{device.battery} - temp:{device.temperature}
            </p>
          }
          secondaryTextLines={2}
          key={i++}/>
        );
      });
      Devices = (<List>{devicesList}</List>);

    }else {
      Devices = (<span style={emptyStyle}>no devices found</span>);
    }

    return (
      <div style={containerStyle}>
        {Devices}
        <Dialog
          ref='EddystoneEdit'
          autoDetectWindowHeight={true} autoScrollBodyContent={true}
          title='Edit Device'
          actions={standardActions}
          actionFocus='submit'>
          <EddystoneAdd {...this.state.device}/>
        </Dialog>
      </div>
    );
  },

  _editDevice: function (device) {
    this.setState({ device: device } );
    this.refs.EddystoneEdit.show();
  },

  _onDialogSubmit: function () {
    console.log('_onDialogSubmit');
  }
});

module.exports = EddystoneList;
