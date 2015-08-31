let React = require('react/addons');
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;

let List = mui.List;
let Dialog = mui.Dialog;

let EddystoneListItem = require('./EddystoneListItem');
let EddystoneAdd = require('./EddystoneAdd');

let EddystoneList = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func.isRequired,
  },

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
      { text: 'Submit', onTouchTap: this.props.onSubmit, ref: 'submit' }
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
      let devicesList = this.state.devices.map(function (device, index) {
        return (
          <EddystoneListItem
          device={device}
          onClick={self._editDevice.bind(null, device)}
          key={index}/>);
      });
      Devices = (<List>{devicesList}</List>);

    }else {
      Devices = (<span style={emptyStyle}>no devices found</span>);
    }

    return (
      <div style={containerStyle}>
        {Devices}
        <Dialog
          ref='EddystoneAdd'
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
    this.refs.EddystoneAdd.show();
  },

});

module.exports = EddystoneList;
