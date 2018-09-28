import React, { Component } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import { addEvent, getEvents, editEvent } from '../actions/eventsActions';
import { selectDate, changeMode } from '../actions/calendarActions';
import './AddEvent.scss';
import { Input, Button } from 'react-materialize';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      time: '',
      date: '',
      eventType: '',
      important: false,
      message: '',
      events: []
    };
  }

  componentDidMount() {
    const { selectedEvent: event, selectedDate } = this.props;
    const date = event.date || selectedDate;
    this.setState({
      date: dateFns.format(date, 'D MMMM YYYY'),
      name: event.name || '',
      time: event.time || '',
      eventType: event.eventType || '',
      important: event.important || ''
    });
  }

  handleSubmit = e => {
    const { mode, addEvent, editEvent, selectedEvent } = this.props;
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
      mode === 'edit'
        ? editEvent(selectedEvent._id, newEvent)
        : addEvent(newEvent);
      this.setState({
        name: '',
        time: '',
        date: '',
        important: false
      });
      this.forceUpdate();
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  checkedCheck = e => {
    console.log(e.target.checked)
    this.setState({
      important : e.target.checked
    });
  }

  render() {
    const { message, name, date, time } = this.state;
    const { selectedDate, mode, events } = this.props;

    return (
      <div className="add-event__form">
        <Input
          type="text"
          name="name"
          className="validate"
          placeholder="Event name"
          onChange={this.handleChange}
          value={name}
        />
        {message && <p className="message">{message}</p>}
        {mode === 'edit' && (
          <input
            type="date"
            name="date"
            onChange={this.handleChange}
            value={date}
          />
        )}
        <Input
          type="time"
          name="time"
          onChange={this.handleChange}
          value={time}
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
          onChange={this.checkedCheck}
        />
        <Button waves="light" className="btn" onClick={this.handleSubmit}>
          Submit
        </Button>
        {mode !== 'view' &&
          selectedDate &&
          events.length !== 0 && (
            <Button
              waves="light"
              className="btn"
              onClick={() => this.props.changeMode('view')}
            >
              Back
            </Button>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedEvent: state.calendar.selectedEvent,
  selectedDate: state.calendar.selectedDate,
  mode: state.calendar.mode,
  events: state.events.events
});

export default connect(
  mapStateToProps,
  { addEvent, getEvents, editEvent, selectDate, changeMode }
)(AddEvent);
