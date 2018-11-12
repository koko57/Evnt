import React, { Component } from 'react';
import './Welcome.scss';

class Welcome extends Component {
  render() {
    return (
      <div className="start">
        <h2 className="start__welcome">Welcome to</h2>
        <h1 className="start__header">Evnt</h1>
        <a href="/login" className="start__btn">
          Sign In
        </a>
        <a href="/register" className="start__btn">
          Register
        </a>
      </div>
    );
  }
}

export default Welcome;
