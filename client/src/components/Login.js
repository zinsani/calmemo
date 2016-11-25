// @flow
import React, { Component } from 'react';
import { loginWithEmail, authWithGoogle } from '../helpers/auth';

class Login extends Component {
  state = {
    useEmail: false,
  }

  handleSubmit(e) {
    e.preventDefault()
    loginWithEmail(this.email.value, this.pw.value)
  }

  render() {

    let emailForm = this.state.useEmail ? (<div className="col-sm-6 col-sm-offset-3">
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
    ) : null;

    return <div className="container">
      <h1> Login </h1>
      {emailForm}
      <button className="btn btn-primary" onClick={() => authWithGoogle() }>Google</button>
    </div>;
  }
}

export default Login;
