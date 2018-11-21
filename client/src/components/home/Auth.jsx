import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signUp } from '../../store/actions/authActions';
import { loading } from '../../store/actions/calendarActions';
import Loader from '../hoc/Loader';
import './Auth.scss';
import AlertModal from '../layout/AlertModal';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: { value: '', valid: true, msg: false },
      email: { value: '', valid: true, msg: false },
      password: { value: '', valid: true, msg: false },
      passwordCheck: { value: '', valid: true, msg: false },
      passwordsMatch: true,
      validForm: true
    };
  }
  componentDidMount() {
    this.props.loading(false);
  }
  handleChange = e => {
    const pattern = {
      username: /^[a-z\d]{3,12}$/i,
      email: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
      password: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z]*$/,
      passwordCheck: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z]*$/
    };
    if (!e.target.value.match(pattern[e.target.name])) {
      this.setState({
        [e.target.name]: { value: e.target.value, valid: false, msg: true }
      });
    } else {
      this.setState({
        [e.target.name]: { value: e.target.value, valid: true, msg: false }
      });
    }
  };

  checkPassword = e => {
    if (this.state.password.value !== e.target.value) {
      this.setState({
        passwordCheck: { ...this.state.passwordCheck, value: e.target.value },
        passwordsMatch: false,
        validForm: false
      });
    } else {
      this.setState({
        passwordsMatch: true,
        validForm: true
      });
    }
  };

  validate = () => {
    const newUser = {
      username: this.state.username.value,
      email: this.state.email.value,
      password: this.state.password.value
    };
    const user = {
      email: this.state.email.value,
      password: this.state.password.value
    };
    const usr = this.props.register ? newUser : user;
    for (let i in usr) {
      if (!usr[i]) {
        return this.setState({
          [usr[i]]: { ...this.state[user[i]], msg: true },
          validForm: false
        });
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    const newUser = {
      username: username.value,
      email: email.value,
      password: password.value
    };
    const user = {
      email: email.value,
      password: password.value
    };
    const { register, signUp, signIn } = this.props;
    const { validForm } = this.state;
    this.validate();
    register && validForm ? signUp(newUser) : signIn(user);
  };
  render() {
    const {
      username,
      email,
      password,
      passwordCheck,
      passwordsMatch
    } = this.state;

    const { register, error } = this.props;
    return (
      <div className="auth-form__wrapper">
        {error && <AlertModal message={error} />}
        {register ? (
          <h1 className="auth-form__title">Create Account</h1>
        ) : (
          <h1 className="auth-form__title">Sign In</h1>
        )}
        <form
          onSubmit={this.handleSubmit}
          className="auth-form__form"
          action={register ? '/register' : '/login'}
          method="POST"
        >
          <input
            type="email"
            name="email"
            id="email"
            className="auth-form__input"
            onChange={this.handleChange}
            value={email.value}
            placeholder="email"
          />
          {!email.value && email.msg && (
            <p className="auth-form__message">Email is required!</p>
          )}
          {!email.valid && email.msg && (
            <p className="auth-form__message">Wrong email format.</p>
          )}
          {register && (
            <input
              type="text"
              name="username"
              id="username"
              className="auth-form__input"
              onChange={this.handleChange}
              value={username.value}
              placeholder="username"
            />
          )}{' '}
          {register && !username.value && username.msg && (
            <p className="auth-form__message">Username is required!</p>
          )}
          {register && !username.valid && username.msg && (
            <p className="auth-form__message">
              Username must be 3 to 12 characters long.
            </p>
          )}
          <input
            type="password"
            name="password"
            id="password"
            className="auth-form__input"
            onChange={this.handleChange}
            value={password.value}
            placeholder="password"
          />
          {!password.value && password.msg && (
            <p className="auth-form__message">Password is required!</p>
          )}
          {!password.valid && password.msg && register &&(
            <p className="auth-form__message">
              Password must be min 8 characters long and contain 1 uppercase
              letter and 1 number
            </p>
          )}
          {register && (
            <input
              type="password"
              name="passwordCheck"
              id="passwordCheck"
              className="auth-form__input"
              onChange={this.checkPassword}
              value={passwordCheck.value}
              placeholder="confirm password"
            />
          )}
          {register && !passwordCheck.value && passwordCheck.msg && (
            <p className="auth-form__message">Confirm your password!</p>
          )}
          {!passwordsMatch && (
            <p className="auth-form__message">Passwords do not match!</p>
          )}
        </form>
        <button className="auth-form__btn" onClick={this.handleSubmit}>
          {register ? 'Register' : 'Sign In'}
        </button>
        <a href="/welcome" className="auth-form__btn">
          Cancel
        </a>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  error: state.auth.message
});

export default Loader(
  connect(
    mapStateToProps,
    { signIn, signUp, loading }
  )(Auth)
);
