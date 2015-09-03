let React = require('react/addons');
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();

let ListItem = mui.ListItem;
let IconButton = mui.IconButton;

let ToggleUnchecked = require('material-ui/lib/svg-icons/toggle/radio-button-unchecked');
let ToggleChecked = require('material-ui/lib/svg-icons/toggle/radio-button-checked');

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

    // context problems stopping from bringing in elements to render so for now
    // genercize button  so could be used as something other than enable
    let DisableButton = (<IconButton
                    tooltip="Disable"
                    onTouchTap={this.props.onButton}>
                    <ToggleChecked/>
                  </IconButton>);

    let EnableButton = (<IconButton
                    tooltip="Enable"
                    onTouchTap={this.props.onButton}>
                    <ToggleUnchecked />
                  </IconButton>);

    return (
      <ListItem
      rightIconButton={peripheral.advertising ? DisableButton : EnableButton}
      onTouchTap={this.props.onRow}
      primaryText={<span>{peripheral.name} - {peripheral.status} - {peripheral.advertising ? '' : 'not'} advertising</span>}
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
