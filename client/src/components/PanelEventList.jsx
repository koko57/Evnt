import React from 'react';
import { connect } from 'react-redux';
import './PanelEventList.scss';
import dateFns from 'date-fns';
import { Button } from 'react-materialize';
import EventBar from './EventBar';

const PanelEventList = ({ events, selectedDate, changePanel }) => {
  const dayEvents = events.filter(e => dateFns.isSameDay(e.date, selectedDate));

  const eventsLi = dayEvents.map(e => (
    <li
      className={`events-list__item row ${dateFns.format(e.date, 'MMMM')}`}
      key={e._id}
    >
      <EventBar name={e.name} id={e._id} changePanel={changePanel}/>
    </li>
  ));
  return (
    <div className="event-panel">
      {dayEvents.length === 0 && <p>No events on this day</p>}
      <ul>{eventsLi}</ul>
      <Button waves="light" className="btn" onClick={() => changePanel('add')}>
        Add new event
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  selectedDate: state.calendar.selectedDate,
  events: state.events.events
});

export default connect(mapStateToProps)(PanelEventList);
