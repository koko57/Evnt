import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AddEvent from './AddEvent';
import Calendar from './Calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/" component={Calendar} />
          <Route path="/add-event" component={AddEvent} />
        </Switch>
      </div>
    );
  }
}

export default App;
