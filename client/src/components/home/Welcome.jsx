import React, { Component } from 'react';
import Loader from '../hoc/Loader';
import { loading } from '../../store/actions/calendarActions';
import { connect } from 'react-redux';
import './Welcome.scss';

class Welcome extends Component {
  componentDidMount() {
    this.props.loading(false);
  }
  render() {
    return (
      <div className="start">
        <h2 className="start__welcome">Welcome to</h2>
        <h1 className="start__header">Evnt</h1>
        <a href="/login" className="start__btn" onClick={() => this.props.loading(true)}>
          Sign In
        </a>
        <a href="/register" className="start__btn" onClick={() => this.props.loading(true)}>
          Register
        </a>
      </div>
    );
  }
}

export default Loader(
  connect(
    null,
    { loading }
  )(Welcome)
);
