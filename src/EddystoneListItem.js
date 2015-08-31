let React = require('react/addons');
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();

let ListItem = mui.ListItem;

let DeviceBluetooth = require('material-ui/lib/svg-icons/device/bluetooth');

let EddystoneListItem = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired,
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

    return (
      <ListItem
      onClick={this.props.onClick}
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
  },

});

module.exports = EddystoneListItem;
