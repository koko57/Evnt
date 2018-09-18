import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEvent, selectDate } from '../actions/actions';
import './AddEvent.scss';


class AddEvent extends Component {
  state = {
    name: '',
    time: '',
    date: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      name: this.state.name,
      time: this.state.time,
      date: this.state.date
    };
    this.props.addEvent(newEvent);
    this.setState({ name: '',
    time: '',
    date: ''});

    console.log('submit', this.props);
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="add-event">
        <form onSubmit={this.handleSubmit} className="add-event--form">
          <input type="text" name="name" placeholder="Event name" onChange={this.handleChange} value={this.state.name}/>
          <input type="date" name="date" onChange={this.handleChange} value={this.state.date}/>
          <input type="time" name="time" onChange={this.handleChange} value={this.state.time}/>
        </form>
        <p>date:{this.props.selectedDate}</p>
      </div>
      );
    }
  }


  const mapStateToProps = state => ({
    date: state.selectedDate,
    events: state.events
  });

  export default connect(
    mapStateToProps,
    { addEvent, selectDate }
  )(AddEvent);
