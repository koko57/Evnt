import React, { Component } from 'react';
import axios from 'axios'
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
    this.setState({
      passwordCheck: e.target.value,
      passwordsMatch: true
    });
    if (this.state.password !== e.target.value) {
      this.setState({ passwordCheck: e.target.value, passwordsMatch: false });
    } else {
      return;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    const user = {
      username: this.state.username,
      password: this.state.password
    }

    if (this.props.register) {
      axios.post('/api/auth/register', newUser);
    } else {
      axios.post('/api/auth/login', user);
    }


    for (let i in this.state) {
      if (!this.state.i) {
        return this.setState({ message: true });
      }
    }
  };
  render() {
    const {
      username,
      email,
      password,
      passwordCheck,
      passwordsMatch,
      message
    } = this.state;
    const { register } = this.props;
    return (
      <div className="auth-form__wrapper">
        {register ? (
          <h1 className="auth-form__title">Create Account</h1>
        ) : (
          <h1 className="auth-form__title">Sign In</h1>
        )}
        <form onSubmit={this.handleSubmit} className="auth-form__form"
        action={register ? "/register" : "/login"} method="POST">

            <input
              type="text"
              name="username"
              id="username"
              className="auth-form__input"
              onChange={this.handleChange}
              value={username}
              placeholder="username"
            />

          {
            !username &&
            message && (
              <p className="event-info__message">Username is required!</p>
            )}
         {register && <input
            type="email"
            name="email"
            id="email"
            className="auth-form__input"
            onChange={this.handleChange}
            value={email}
            placeholder="youremail@email.com"
          />
         } {register && !email &&
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
          {register && (
            <input
              type="password"
              name="passwordCheck"
              id="passwordCheck"
              className="auth-form__input"
              onChange={this.checkPassword}
              value={passwordCheck}
              placeholder="confirm password"
            />
          )}
          {register &&
            !passwordCheck &&
            message && (
              <p className="event-info__message">Confirm your password!</p>
            )}
          {!passwordsMatch && (
            <p className="event-info__message">Passwords do not match!</p>
          )}
        </form>
        <button
          className="auth-form__btn"
          onClick={this.handleSubmit}
        >
          {register ? 'Register' : 'Sign In'}
        </button>
        <a href="/" className="auth-form__btn">
          Cancel
        </a>
      </div>
    );
  }
}
