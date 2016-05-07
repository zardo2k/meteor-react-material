import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

class HelloWorld extends React.Component {
  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}
Meteor.startup(() => {
  render(<HelloWorld/>, document.getElementById('app'));
});
