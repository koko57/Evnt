import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'date-fns'
import { addEvent, getEvents, editEvent } from '../../actions/eventsActions';
import {
  selectDate,
  changeMode,
  closePanel,
  selectEvent
} from '../../actions/calendarActions';
import './EventForm.scss';

class EventForm extends Component {
  state = {
    name: '',
    time: '',
    date: '',
    eventType: '',
    important: false,
    message: ''
  };

  componentDidMount() {
    const { selectedEvent: event, selectedDate, getEvents } = this.props;
    getEvents();
    const date = selectedDate ? selectedDate : event.date;

    this.setState({
      name: event.name ? event.name : '',
      time: event.time ? event.time : '',
      date: date,
      eventType: event.eventType ? event.eventType : '',
      important: event.important ? event.important : false
    });
  }

  handleSubmit = e => {
    const {
      mode,
      addEvent,
      editEvent,
      getEvents,
      selectedEvent,
      selectEvent,
      changeMode,
      selectedDate,
      closePanel
    } = this.props;
    e.preventDefault();
    if (!this.state.name) {
      this.setState({ message: 'Event name is required!' });
    } else {
      const newEvent = {
        name: this.state.name,
        time: this.state.time,
        date: this.state.date,
        eventType: this.state.eventType,
        important: this.state.important
      };
      mode === 'edit'
        ? editEvent(selectedEvent._id, newEvent)
        : addEvent(newEvent);
      selectedDate ? changeMode('view') : closePanel();
      selectEvent('');
      getEvents();
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleClick = () => {
    this.props.changeMode('view');
  };

  checkIfChecked = e => {
    this.setState({
      important: e.target.checked
    });
  };

  render() {
    const { message, name, date, time, eventType, important } = this.state;
    const { selectedDate, mode, events } = this.props;
    let types = ['music', 'movie', 'art', 'family', 'meeting', 'other'];
    types = types.map(type => {
      return (
        <div>
          <input
            name="eventType"
            type="radio"
            className="event-type"
            onChange={this.handleChange}
            value={type}
            id={type}
            checked={eventType === type ? true : false}
          />
          <div className={`wrapper ${type}`}>
            <label htmlFor={type} className="event-type__label">{type}</label>
          </div>
        </div>
      );
    });

    return (
      <div className="add-event__form">
        <input
          type="text"
          className="event-info event-info--name validate"
          name="name"
          placeholder="Event name"
          onChange={this.handleChange}
          value={name}
          required
        />
        {!name && <p className="event-info__message">{message}</p>}
        {mode === 'edit' && (
          <input
            className="event-info event-info--date"
            type="date"
            name="date"
            onChange={this.handleChange}
            value={format(date, 'yyyy-MM-dd')}
          />
        )}
        <input
          type="time"
          name="time"
          className="event-info event-info--time"
          onChange={this.handleChange}
          value={time}
        />
        <div className="event-types">{types}</div>
        <input
          name="important"
          type="checkbox"
          id="important"
          className="event-check__input"
          onChange={this.checkIfChecked}
        />
        <label htmlFor="important" className="event-check">
          <i className="event-check__checkbox material-icons">
            {important ? 'check_box' : 'check_box_outline_blank'}
          </i>
          <span className="event-check__label">Important!</span>
        </label>
        <button className="btn btn--submit" onClick={this.handleSubmit}>
          Submit
        </button>
        {mode !== 'view' &&
          selectedDate &&
          events.length !== 0 && (
            <div className="btn btn--back" onClick={this.handleClick}>
              Back
            </div>
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

EventForm.propTypes = {
  selectedEvent: PropTypes.object,
  selectedDate: PropTypes.string,
  mode: PropTypes.string,
  events: PropTypes.array,
  addEvent: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  editEvent: PropTypes.func.isRequired,
  selectDate: PropTypes.func.isRequired,
  selectEvent: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  closePanel: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  {
    addEvent,
    getEvents,
    editEvent,
    selectDate,
    selectEvent,
    changeMode,
    closePanel
  }
)(EventForm);
