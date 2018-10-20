import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Calendar from './calendar/Calendar';
import Homepage from './home/Homepage';
import Auth from './home/Auth';
import EventsList from './editor/EventsList';
import './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/eventslist" component={EventsList} />
            <Route path="/register" component={Auth} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.selectedDate
});

export default connect(mapStateToProps)(App);
