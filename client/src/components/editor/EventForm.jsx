import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  addEvent,
  getEvents,
  editEvent
} from '../../store/actions/eventsActions';
import {
  selectDate,
  changeMode,
  closePanel,
  selectEvent
} from '../../store/actions/calendarActions';
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
    const {
      selectedEvent: event,
      selectedDate,
      trapFocus,
      loggedUser
    } = this.props;
    const date = selectedDate ? selectedDate : event.date;
    this.setState({
      name: event.name ? event.name : '',
      time: event.time ? event.time : '',
      date: new Date(date),
      eventType: event.eventType ? event.eventType : '',
      important: event.important ? event.important : false,
      user: loggedUser
    });
    document.getElementById('name').focus();
    trapFocus();
  }

  handleSubmit = e => {
    const {
      mode,
      addEvent,
      editEvent,
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
        important: this.state.important,
        user: this.state.user
      };
      mode === 'edit'
        ? editEvent(selectedEvent._id, newEvent)
        : addEvent(newEvent);
      selectedDate ? changeMode('view') : closePanel();
      selectEvent({});
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

  checkCheckbox = e => {
    this.setState({
      important: e.target.checked
    });
  };

  selectRadio = e => {
    const type = e.target.previousSibling.id;
    this.setState({
      eventType: type
    });
  };

  render() {
    const { message, name, date, time, eventType, important } = this.state;
    const { selectedDate, mode, events } = this.props;

    // Rendering radio buttons
    let types = ['music', 'movie', 'art', 'family', 'meeting', 'other'];
    types = types.map(type => {
      return (
        <div className="event-type" key={type}>
          <input
            name="eventType"
            type="radio"
            className="event-type__input"
            onChange={this.handleChange}
            value={type}
            id={type}
            tabIndex="-1"
            checked={eventType === type ? true : false}
          />
          <div
            className={`event-type__wrapper ${type}`}
            onKeyPress={this.selectRadio}
            tabIndex="0"
          >
            <label htmlFor={type} className="event-type__label">
              {type}
            </label>
          </div>
        </div>
      );
    });

    return (
      <form
        className="add-event__form"
        id="event-form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          className="event-info event-info--name validate"
          name="name"
          id="name"
          placeholder="Event name"
          onChange={this.handleChange}
          tabIndex="0"
          value={name}
          autoFocus
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
          onChange={this.checkCheckbox}
        />

        <div className="event-check__wrapper">
          <label htmlFor="important" className="event-check">
            <i className="event-check__checkbox material-icons" id="checkIcon">
              {important ? 'check_box' : 'check_box_outline_blank'}
            </i>
            <span className="event-check__label">Important!</span>
          </label>
        </div>

        <button type="submit" className="modal-button--large" id="submit">
          Submit
        </button>
        {mode !== 'view' && selectedDate && events.length !== 0 && (
          <button
            className="modal-button--large"
            onClick={this.handleClick}
            id="back"
          >
            Back
          </button>
        )}
      </form>
    );
  }
}

const mapStateToProps = state => ({
  selectedEvent: state.calendar.selectedEvent,
  selectedDate: state.calendar.selectedDate,
  mode: state.calendar.mode,
  events: state.events.events,
  loggedUser: state.auth.loggedUser
});

EventForm.propTypes = {
  selectedEvent: PropTypes.object,
  selectedDate: PropTypes.string,
  mode: PropTypes.string,
  events: PropTypes.array,
  trapFocus: PropTypes.func.isRequired,
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
