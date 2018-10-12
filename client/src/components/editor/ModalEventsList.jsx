import React, { Component } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { changeMode } from '../../actions/calendarActions';
import { getEvents } from '../../actions/eventsActions';
import EventBar from './EventBar';
import './ModalEventsList.scss';

class ModalEventsList extends Component {
  handleClick = () => {
    this.props.changeMode('add');
  };
  render() {
    const { dayEvents } = this.props;
    const eventsLi = dayEvents.map(e => (
      <li
        className={`events-list__item row ${format(e.date, 'MMMM')}`}
        key={e._id}
      >
        <EventBar event={e} barStyle="panel" />
      </li>
    ));
    return (
      <div className="event-panel">
        {dayEvents.length === 0 && (
          <p className="event-panel__message">No events on this day.</p>
        )}
        <ul>{eventsLi}</ul>
        <button className="btn" onClick={this.handleClick}>
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

export default connect(
  mapStateToProps,
  { getEvents, changeMode }
)(ModalEventsList);
