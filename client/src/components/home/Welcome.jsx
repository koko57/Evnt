import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../hoc/Loader';
import { loading } from '../../store/actions/calendarActions';
import { connect } from 'react-redux';
import './Welcome.scss';

class Welcome extends Component {
  componentDidMount() {
    this.props.loading(false);
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="start">
        <h2 className="start__welcome">Welcome to</h2>
        <h1 className="start__header">Evnt</h1>
        <a href="/login" className="start__btn" onClick={() => loading(true)}>
          Sign In
        </a>
        <a
          href="/register"
          className="start__btn"
          onClick={() => loading(true)}
        >
          Register
        </a>
      </div>
    );
  }
}

Welcome.propTypes = {
  loading: PropTypes.func.isRequired
};

export default Loader(
  connect(
    null,
    { loading }
  )(Welcome)
);
