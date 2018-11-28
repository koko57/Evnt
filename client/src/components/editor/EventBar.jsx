import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { format } from 'date-fns';
import { getEvents, deleteEvent } from '../../store/actions/eventsActions';
import {
  selectEvent,
  openPanel,
  changeMode
} from '../../store/actions/calendarActions';
import './EventBar.scss';

class EventBar extends Component {
  deleteEvent = e => {
    this.props.deleteEvent(e.currentTarget.dataset.id);
  };
  editEvent = e => {
    const { selectEvent, openPanel, changeMode, events } = this.props;
    const id = e.currentTarget.dataset.id;
    const selectedEvent = _.find(events, e => e._id === id);
    selectEvent(selectedEvent);
    openPanel();
    changeMode('edit');
  };
  render() {
    const dateFormat = window.innerWidth > 480 ? 'EEEE, d MMMM' : 'EEE, d MMM';
    const { event, barStyle } = this.props;
    const panel = barStyle === 'panel';
    const list = barStyle === 'list';
    return (
      <div className="event-bar">
        <div className="event-bar__info">
          <div className="event-bar__item event-bar__item--name">
            <i
              className={`material-icons event-bar__typeIcon ${
                event.eventType
              }`}
              title={`${event.eventType.toUpperCase()}${
                event.important ? ' Important!' : ''
              }`}
            >
              {event.important ? 'error_outline' : 'panorama_fish_eye'}
            </i>
            <span className="event-bar__item__text">{event.name}</span>
          </div>
          {list && (
            <div className="event-bar__item event-bar__item--date">
              <span className="event-bar__item__text">
                {format(event.date, dateFormat)}
              </span>
            </div>
          )}
          <div className="event-bar__item event-bar__item--time">
            <span className="event-bar__item__text">{event.time}</span>
          </div>
        </div>

        <div
          className={`event-bar__icons ${
            panel ? 'event-bar__icons--panel' : ''
          }`}
        >
          <button
            className="event-bar__iconBtn event-bar__iconBtn--edit"
            data-id={event._id}
            onClick={this.editEvent}
          >
            <i className="event-bar__icon material-icons" title="Edit event">
              edit
            </i>
          </button>
          <button
            className="event-bar__iconBtn event-bar__iconBtn--delete"
            data-id={event._id}
            onClick={this.deleteEvent}
          >
            <i className="event-bar__icon material-icons" title="Delete event">
              clear
            </i>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  panelOpened: state.calendar.panelOpened,
  selectedEvent: state.calendar.selectedEvent
});

EventBar.propTypes = {
  event: PropTypes.object.isRequired,
  barStyle: PropTypes.string.isRequired,
  events: PropTypes.array,
  panelOpened: PropTypes.bool,
  getEvents: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  selectEvent: PropTypes.func.isRequired,
  openPanel: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getEvents, deleteEvent, selectEvent, openPanel, changeMode }
)(EventBar);
