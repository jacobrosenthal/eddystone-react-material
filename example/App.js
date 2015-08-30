let React = require('react/addons');
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;

let FloatingActionButton = mui.FloatingActionButton;
let AppBar = mui.AppBar;
let Dialog = mui.Dialog;

let ContentAdd = require('material-ui/lib/svg-icons/content/add');

let Erm = require('../');
let EddystoneList = Erm.EddystoneList;
let EddystoneAdd = Erm.EddystoneAdd;

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

let App = React.createClass({
  getInitialState: function () {
    return {
      peripherals: [
      { name: 'pumpkins', status: 'Immediate', type: 'uid', namespaceId: 'ed8e1220eac38ac4f4c2', instanceId: '000000000001', tlmCount: 2, tlmPeriod: 10, battery: 89, temperature: 25 },
      { name: 'pumpkins2', status: 'Out of Range', type: 'uid', namespaceId: 'ed8e1220eac38ac4f4c2', instanceId: '000000000002', tlmCount: 2, tlmPeriod: 10, battery: 98, temperature: 25 },
      { name: 'pumpkins3', status: 'Far', type: 'uid', namespaceId: 'ed8e1220eac38ac4f4c2', instanceId: '000000000003', tlmCount: 2, tlmPeriod: 10, battery: 78, temperature: 24 },
      { name: 'pumpkins4', status: 'Out of Range', type: 'uid', namespaceId: 'ed8e1220eac38ac4f4c2', instanceId: '000000000004', tlmCount: 2, tlmPeriod: 10, battery: 94, temperature: 24 },
      { name: 'pumpkins5', status: 'Out of Range', type: 'uid', namespaceId: 'ed8e1220eac38ac4f4c2', instanceId: '000000000005', tlmCount: 2, tlmPeriod: 10, battery: 99, temperature: 26 },
      { name: 'pumpkins6', status: 'Immediate', type: 'url', url: 'http://www.google.com', tlmCount: 2, tlmPeriod: 10, battery: 77, temperature: 25 }
      ]
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

    //Standard Actions
    let standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit' }
    ];

    return (
      <div style={containerStyle}>
        <AppBar style={appBarStyle} showMenuIconButton={false} title='Visual Bleno'/>

        <EddystoneList peripherals={this.state.peripherals}/>

        <FloatingActionButton style={actionButtonStyle} onTouchTap={this._handleTouchTap}>
          <ContentAdd/>
        </FloatingActionButton>

        <Dialog
          ref='EddystoneAdd'
          autoDetectWindowHeight={true} autoScrollBodyContent={true}
          title='Add Device'
          actions={standardActions}
          actionFocus='submit'>
          <EddystoneAdd {...this.state.device}/>
        </Dialog>
      </div>
    );
  },

  _handleTouchTap: function () {
    this.refs.EddystoneAdd.show();
  },

  _onDialogSubmit: function () {
    console.log('_onDialogSubmit');
  }
});

module.exports = App;

