import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './Loader.scss';

const Loader = Wrapped => {
  class Load extends Component {
    render() {
      return (
        <Fragment>
          {this.props.isLoading && (
            <div className="loader">
              <div className="circle__wrapper">
                <div className="circle circle--outer">
                  <div className="circle circle--inner" />
                </div>
              </div>
            </div>
          )}
          <Wrapped {...this.props} />
        </Fragment>
      );
    }
  }

  const mapStateToProps = state => ({
    isLoading: state.calendar.isLoading
  });

  return connect(mapStateToProps)(Load);
};

export default Loader;
