import React, { Component } from 'react';
import './Homepage.scss'

class Homepage extends Component {
  render() {
    return (
      <div className="splash">
        <h2 className="app-welcomeMsg">Welcome to</h2>
        <h1 className="app-logo">Evnt</h1>
        <button className="splash__btn">Sign In</button>
        <a href="/register" className="splash__btn">Register</a>
      </div>
    );
  }
}

export default Homepage;
