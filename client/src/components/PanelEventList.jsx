import React from 'react';
import { connect } from 'react-redux';
import './PanelEventList.scss';
import dateFns from 'date-fns';
import Icon from 'react-materialize/lib/Icon';

// TODO: onClick icon functions (edit, delete)

const PanelEventList = ({events, selectedDate}) => {
    const dayEvents = events.filter(e =>
      dateFns.isSameDay(e.date, selectedDate)
    );
    const eventsLi = dayEvents.map(e => (
      <li
        className={`events-list__item row ${dateFns.format(e.date, 'MMMM')}`}
        key={e._id}
      >
        <div className="col m4 s6">{e.name}</div>
        <div className="col m2 offset-m6 s6">
          <span><Icon>edit</Icon></span>
          <span><Icon>clear</Icon></span>
        </div>
      </li>
    ));
    return (
      <div className="event-panel">
        {dayEvents.length === 0 && <p>No events on this day</p>}
        <ul>{eventsLi}</ul>
      </div>
    );
}

const mapStateToProps = state => ({
  selectedDate: state.events.selectedDate,
  events: state.events.events
});

export default connect(
  mapStateToProps
)(PanelEventList);
