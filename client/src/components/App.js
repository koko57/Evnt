import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Calendar from './calendar/Calendar';
import EventsList from './editor/EventsList';
import './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Calendar} />
            <Route path="/eventslist" component={EventsList} />
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
