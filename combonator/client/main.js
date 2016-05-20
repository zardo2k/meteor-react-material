import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

import './main.css';

class HelloWorld extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <AppBar
          title="My AppA">
          <FlatButton label="Default" />
        </AppBar>
      </MuiThemeProvider>
    );
  }
}

class ConnectionMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      message: 'connecting'
    };
  }

  componentDidMount() {
    Tracker.autorun(()=> {
       console.log(Meteor.status().status);
      if (Meteor.status().status === 'connecting') {
        this.setState({open: true, message: Meteor.status().status});
      } else {
        this.setState({open: false, message: Meteor.status().status});
      }
    });

  }

  render() {
    return (
      <Dialog
        open={true}
        style={{position: 'absolute'}}
        contentStyle=
          {{textAlign: 'center', width: '100%', maxWidth: '100%'}}>
        <CircularProgress size={0.25}/>
        <div>{this.state.message}</div>
      </Dialog>
    )
  }
}

Meteor.startup(() => {
  // Needed for onTouchTap
  // Check this repo:
  // https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <ConnectionMessage></ConnectionMessage>
    </MuiThemeProvider>,
    document.getElementById('header'));
});
