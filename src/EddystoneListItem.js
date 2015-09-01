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
    peripheral: React.PropTypes.object.isRequired
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
    let peripheral = this.props.peripheral;
    let url = 'URL: ' + peripheral.url;
    let uid = 'UID: ' + peripheral.namespaceId + peripheral.instanceId;

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
      rightIconButton={peripheral.status === 'Out of Range' ? EnableButton : DisableButton}
      onTouchTap={this.props.onRow}
      primaryText={<span>{peripheral.name} - {peripheral.status}</span>}
      secondaryText={
        <p>
          {peripheral.type === 'url' ? url : uid }
          <br/>
          battery:{peripheral.battery} - temp:{peripheral.temperature}
        </p>
      }
      secondaryTextLines={2}/>
    );
  }

});

module.exports = EddystoneListItem;
