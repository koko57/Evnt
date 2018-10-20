import React, { Component } from 'react';
import './Auth.scss';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordCheck: '',
      passwordsMatch: false,
      message: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    for (let i in this.state) {
      if (!this.state.i) {
        this.setState({ message: true });
      } else {
        const newUser = {
          username: this.state.username,
          email: '',
          password: ''
        };
      }
    }
  };
  render() {
    const { username, email, password, passwordCheck, message } = this.state;
    return (
      <div className="auth-form__wrapper">
        <h1>Create Account</h1>
        <form onSubmit={this.handleSubmit} className="auth-form__form">
          <input
            type="text"
            name="username"
            id="username"
            className="auth-form__input"
            onChange={this.handleChange}
            value={username}
            placeholder="username"
          />
          {!username && message && <p className="event-info__message" />}
          <input
            type="email"
            name="email"
            id="email"
            className="auth-form__input"
            onChange={this.handleChange}
            value={email}
            placeholder="youremail@email.com"
          />
          {!email &&
            message && (
              <p className="event-info__message">Email is required!</p>
            )}
          <input
            type="password"
            name="password"
            id="password"
            className="auth-form__input"
            onChange={this.handleChange}
            value={password}
            placeholder="password"
          />
          {!password &&
            message && (
              <p className="event-info__message">Password is required!</p>
            )}
          <input
            type="password"
            name="passwordCheck"
            id="passwordCheck"
            className="auth-form__input"
            onChange={this.handleChange}
            value={passwordCheck}
            placeholder="confirm password"
          />
          {!passwordCheck &&
            message && (
              <p className="event-info__message">Confirm your password!</p>
            )}
          <button type="submit" className="splash__btn">
            Register
          </button>
          <a href="/" className="splash__btn">
            Cancel
          </a>
        </form>
      </div>
    );
  }
}
