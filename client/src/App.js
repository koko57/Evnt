import React, { Component } from 'react';
import './App.css';
import AddEvent from './components/AddEvent';
import Calendar from './components/Calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calendar />
        <AddEvent />
      </div>
    );
  }
}

export default App;
