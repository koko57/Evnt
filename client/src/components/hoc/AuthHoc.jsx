import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../store/actions/authActions';
import jwtDecode from 'jwt-decode';

const AuthHoc = Wrapped => {
  class Wrapper extends Component {
    componentWillMount() {
      const user = localStorage.getItem('user');
      if (!this.props.logged && !user) {
        this.props.history.push('/welcome');
      } else {
        this.props.setCurrentUser(jwtDecode(user).id);
      }
    }
    componentWillUpdate(nextProps) {
      const user = localStorage.getItem('user');
      if (!nextProps.logged && !user) {
        this.props.history.push('/welcome');
      } else {
        this.props.setCurrentUser(jwtDecode(user).id);
      }
    }
    render() {
      return <Wrapped {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      logged: state.auth.logged
    };
  };

  Wrapper.propTypes = {
    history: PropTypes.object.isRequired,
    logged: PropTypes.bool.isRequired,
    setCurrentUser: PropTypes.func.isRequired
  };

  return connect(
    mapStateToProps,
    { setCurrentUser }
  )(Wrapper);
};

AuthHoc.propTypes = {
  Wrapped: PropTypes.element.isRequired
};

export default AuthHoc;
