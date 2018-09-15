import React, { Component } from 'react';

export default class AddEvent extends Component {
  state = {
    name: '',
    time: {},
    date: {}
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit', this.state);
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="add-event">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="Event name" onChange={this.handleChange} />
          <input type="date" name="date" onChange={this.handleChange} />
          <input type="time" name="time" onChange={this.handleChange} />
        </form>
      </div>
      );
    }
  }
