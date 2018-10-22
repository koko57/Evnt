import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
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
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/my-events" component={Calendar} />
            <Route path="/eventslist" component={EventsList} />
            <Route path="/register" component={() => <Auth register={true}/>} />
            <Route path="/login" component={Auth} register={false}/>
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
