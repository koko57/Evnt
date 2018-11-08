import React, { Component } from 'react';
import './Welcome.scss';

class Welcome extends Component {
  render() {
    return (
      <div className="splash">
        <h2 className="app-welcomeMsg">Welcome to</h2>
        <h1 className="app-logo">Evnt</h1>
        <a href="/login" className="splash__btn">
          Sign In
        </a>
        <a href="/register" className="splash__btn">
          Register
        </a>
      </div>
    );
  }
}

export default Welcome;
