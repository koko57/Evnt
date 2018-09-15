import React, { Component } from 'react';
import './App.css';
import AddEvent from './components/AddEvent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddEvent />
      </div>
    );
  }
}

export default App;
