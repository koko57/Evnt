import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { format, isSameDay } from 'date-fns';
import { changeMode } from '../../store/actions/calendarActions';
import { getEvents } from '../../store/actions/eventsActions';
import EventBar from './EventBar';
import './ModalEventsList.scss';

class ModalEventsList extends Component {
  componentDidMount() {
    document.getElementById('event-panel').focus();
    this.props.trapFocus();
  }
  handleClick = () => {
    this.props.changeMode('add');
  };
  render() {
    const { events, selectedDate } = this.props;
    const dayEvents = events.filter(e =>
      isSameDay(e.date, new Date(selectedDate))
    );
    const eventsLi = dayEvents.map(e => (
      <li
        className={`events-list__item row ${format(e.date, 'MMMM')}`}
        key={e._id}
      >
        <EventBar event={e} barStyle="panel" />
      </li>
    ));
    return (
      <div className="event-panel" id="event-panel">
        {dayEvents.length === 0 && (
          <p className="event-panel__message">No events on this day.</p>
        )}
        <ul className="event-panel__list">{eventsLi}</ul>
        <button
          className="modal-button--large"
          onClick={this.handleClick}
          autoFocus
        >
          Add new event
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.calendar.selectedDate,
  events: state.events.events
});

ModalEventsList.propTypes = {
  dayEvents: PropTypes.array,
  selectedDate: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  getEvents: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  trapFocus: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getEvents, changeMode }
)(ModalEventsList);
