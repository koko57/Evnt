import React, { Component } from 'react';
import { connect } from 'react-redux';

const AuthHoc = Wrapped => {
  class Auth extends Component {
    componentWillMount() {
      if (this.props.logged === false && !localStorage.getItem('user')) {
        this.props.history.push('/welcome');
      }
    }
    componentWillUpdate(nextProps) {
      if (nextProps.logged === false && !localStorage.getItem('user')) {
        this.props.history.push('/welcome');
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

  return connect(mapStateToProps)(Auth);
};

export default AuthHoc;
