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
      passwordsMatch: true,
      message: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  checkPassword = e => {
    this.setState({passwordCheck: e.target.value,
      passwordsMatch: true})
    if(this.state.password !== e.target.value) {
      this.setState({passwordCheck: e.target.value,passwordsMatch: false})
    } else {
    return
}  }

  handleSubmit = e => {
    e.preventDefault();
    for (let i in this.state) {
      if (!this.state.i) {
        this.setState({ message: true });
      } else {
        const newUser = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        };
      }
    }
  };
  render() {
    const { username, email, password, passwordCheck, passwordsMatch, message } = this.state;
    const { register } = this.props;
    return (
      <div className="auth-form__wrapper">
        <h1 className="auth-form__title">Create Account</h1>
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
          {!username &&
            message && (
              <p className="event-info__message">Username is required!</p>
            )}
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
            onChange={this.checkPassword}
            value={passwordCheck}
            placeholder="confirm password"
          />
          {!passwordCheck &&
            message && (
              <p className="event-info__message">Confirm your password!</p>
            )}
            {!passwordsMatch && (
              <p className="event-info__message">Passwords do not match!</p>
            )}
        </form>
        <button type="submit" className="auth-form__btn" onClick={this.handleSubmit}>
          Register
        </button>
        <a href="/" className="auth-form__btn">
          Cancel
        </a>
      </div>
    );
  }
}
