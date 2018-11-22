import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Calendar from './calendar/Calendar';
import Welcome from './home/Welcome';
import Auth from './home/Auth';
import EventsList from './editor/EventsList';
import './App.scss';

class App extends Component {
  render() {
    const { location } = this.props;
    return (
      <div className="app">
        <Route exact path="/" component={Calendar} />
        <Route
          path="/welcome"
          component={() => <Welcome location={location} />}
        />
        <Route path="/eventslist" component={EventsList} />
        <Route path="/register" component={() => <Auth register={true} />} />
        <Route
          path="/login"
          component={() => <Auth register={false} location={location} />}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.router.location
});

export default connect(mapStateToProps)(App);
