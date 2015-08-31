let React = require('react/addons');
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();

let ListItem = mui.ListItem;
let IconButton = mui.IconButton;

let DeviceBluetooth = require('material-ui/lib/svg-icons/device/bluetooth');
let DeviceBluetoothDisabled = require('material-ui/lib/svg-icons/device/bluetooth-disabled');

let EddystoneListItem = React.createClass({
  propTypes: {
    onButton: React.PropTypes.func.isRequired,
    onRow: React.PropTypes.func.isRequired,
    device: React.PropTypes.object.isRequired
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
    let device = this.props.device;
    let url = 'URL: ' + device.url;
    let uid = 'UID: ' + device.namespaceId + device.instanceId;

    let EnableButton = (<IconButton
                    tooltip="Enable"
                    onTouchTap={this.props.onButton}>
                    <DeviceBluetooth />
                  </IconButton>);

    let DisableButton = (<IconButton
                    tooltip="Disable"
                    onTouchTap={this.props.onButton}>
                    <DeviceBluetoothDisabled />
                  </IconButton>);

    return (
      <ListItem
      rightIconButton={device.status === 'Out of Range' ? EnableButton : DisableButton}
      onTouchTap={this.props.onRow}
      primaryText={<span>{device.name} - {device.status}</span>}
      leftIcon={<DeviceBluetooth />}
      secondaryText={
        <p>
          {device.type === 'url' ? url : uid }
          <br/>
          battery:{device.battery} - temp:{device.temperature}
        </p>
      }
      secondaryTextLines={2}/>
    );
  }

});

module.exports = EddystoneListItem;
