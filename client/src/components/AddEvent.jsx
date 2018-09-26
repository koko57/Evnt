import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEvent, selectDate, getEvents } from '../actions/actions';
import './AddEvent.scss';
import { Input, Button } from 'react-materialize';

class AddEvent extends Component {
  state = {
    name: '',
    time: '',
    date: '',
    eventType: '',
    important: false,
    message: '',
    events: []
  };

  componentDidMount() {
    this.setState({ date: this.props.selectedDate });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.name) {
      document.querySelector('.validate').classList.add('invalid');
      this.setState({ message: 'Event name is required' });
    } else {
      const newEvent = {
        name: this.state.name,
        time: this.state.time,
        date: this.state.date,
        eventType: this.state.type,
        important: false
      };
      this.props.addEvent(newEvent);
      this.setState({
        name: '',
        time: '',
        date: '',
        important: false
      });
      this.props.selectDate('');
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { message } = this.state;
    return (
      <div className="add-event__form">
        <Input
          type="text"
          name="name"
          className="validate"
          placeholder="Event name"
          onChange={this.handleChange}
          value={this.state.name}
        />
        {message && <p className="message">{message}</p>}
        <Input
          type="time"
          name="time"
          onChange={this.handleChange}
          value={this.state.time}
          options={{ twelvehour: false }}
          placeholder="Event time"
        />
        <div className="event-types">
          <div className="event-types__wrapper">
            <Input
              name="type"
              type="radio"
              className="radio"
              onChange={this.handleChange}
              value="music"
              label="Music"
            />
          </div>
          <div className="event-types__wrapper">
            <Input
              name="type"
              type="radio"
              className="radio"
              onChange={this.handleChange}
              value="movie"
              label="Movie"
            />
          </div>
          <div className="event-types__wrapper">
            <Input
              name="type"
              type="radio"
              className="radio"
              onChange={this.handleChange}
              value="art"
              label="Art"
            />
          </div>
          <div className="event-types__wrapper">
            <Input
              name="type"
              type="radio"
              className="radio"
              onChange={this.handleChange}
              value="meeting"
              label="Meeting"
            />
          </div>
          <div className="event-types__wrapper">
            <Input
              name="type"
              type="radio"
              className="radio"
              onChange={this.handleChange}
              value="family"
              label="Family"
            />
          </div>
          <div className="event-types__wrapper">
            <Input
              name="type"
              type="radio"
              className="radio"
              onChange={this.handleChange}
              value="other"
              label="Other"
            />
          </div>
        </div>

        <Input
          name="important"
          type="checkbox"
          className="filled-in"
          label="Important!"
        />
        <Button waves="light" className="btn" onClick={this.handleSubmit}>
          Add event
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.events.selectedDate,
  events: state.events.events
});

export default connect(
  mapStateToProps,
  { addEvent, selectDate, getEvents }
)(AddEvent);
