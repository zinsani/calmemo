// @flow
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, browserHistory } from 'react-router'
import { firebaseAuth } from '../config';
import { logout } from '../helpers/auth'

class App extends Component {
  state = {
    authed: false,
    loading: true,
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      console.log('fireabaseAuth fired');
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
        browserHistory.push('/dashboard');
      } else {
        this.setState({
          loading: false
        })
        browserHistory.push('/login');
      }
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (<div>
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Link to="/dashboard" className="navbar-brand">CalMemo</Link>
          </div>
          <ul className="nav navbar-nav pull-right">
            <li>
              {this.state.authed
                ? <button
                style={{border: 'none', background: 'transparent'}}
                onClick={() => {
                  logout()
                  this.setState({authed: false})
                  // router.transitionTo('/')
                  browserHistory.push('/login');
                }}
                className="navbar-brand">Logout</button>
                  : <span>
                  <Link to="/login" className="navbar-brand">Login</Link>
                  </span>}
            </li>
          </ul>
        </div>
      </nav>
      <div className="contents">
        { this.props.children }
      </div>
    </div>);
  }
}

export default App;
