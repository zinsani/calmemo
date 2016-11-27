// @flow
import React, { Component } from 'react';
import TextEditor from './TextEditor';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <div className="row">
          <div className="col">
            <TextEditor />
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
