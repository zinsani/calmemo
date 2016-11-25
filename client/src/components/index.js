import React from 'react';
import './index.scss';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import App from './App';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import NoMatch from './NoMatch';

export default function() {
  return <Router history={browserHistory}>
    <Router path="/" component={App}>

      <IndexRoute component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="*" component={NoMatch}/>
    </Router>
  </Router>
}

