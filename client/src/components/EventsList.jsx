import React, { Component } from 'react';
import EditorPanel from './EditorPanel';
import { getEvents, deleteEvent } from '../actions/eventsActions';
import { selectEvent, openPanel } from '../actions/calendarActions';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import _ from 'lodash';
import './EventsList.scss';
import EventBar from './EventBar';

class EventsList extends Component {
  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    let { events } = this.props;
    // events = _.sortBy(events, 'date');
    let months = _.uniq(events.map(e => dateFns.format(e.date, 'MMMM YYYY')));

    let eventsLi = events.map(e => {

    return (<li
      className={`events-list__item row ${dateFns.format(e.date, 'MMMM YYYY')}`}
      key={e._id}
    >
        <EventBar date={e.date} name={e.name} id={e._id} />
      </li>
    )});
    months = months.map(month => (
      <ul className={`events-list__month ${month}`} key={month}>
        <h3>{month}</h3>
        {(eventsLi.filter(e => e.props.className.includes(month)))}
      </ul>
    ));
    return (
      <div className="events-list container">
        {months}
        {this.props.panelOpened && (
          <EditorPanel />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  panelOpened: state.calendar.panelOpened
});

export default connect(
  mapStateToProps,
  { getEvents, deleteEvent, openPanel, selectEvent }
)(EventsList);
