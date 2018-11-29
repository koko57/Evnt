import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { format } from 'date-fns';
import { getEvents, deleteEvent } from '../../store/actions/eventsActions';
import { selectEvent, openPanel } from '../../store/actions/calendarActions';
import Navbar from '../layout/Navbar';
import Modal from './Modal';
import EventBar from './EventBar';
import './EventsList.scss';
import AuthHoc from '../hoc/AuthHoc';
import Loader from '../hoc/Loader';

class EventsList extends Component {
  componentDidMount() {
    this.props.getEvents(this.props.loggedUser);
  }

  render() {
    let { events, panelOpened } = this.props;
    let months = _.uniq(events.map(e => format(e.date, 'MMMM YYYY', { awareOfUnicodeTokens: true })));
    months = months.map(month => (
      <div className={`events-list__month ${month}`} key={month}>
        <h3 className="events-list__heading">{month}</h3>
        {events
          .filter(e => month.includes(format(e.date, 'MMMM')))
          .map(e => (
            <EventBar key={e._id} event={e} barStyle="list" />
          ))}
      </div>
    ));
    return (
      <div className="main">
        <Navbar />
        <div className="events-list">
          <div className="events-list__wrapper">
            {!months.length && (
              <p className="events-list__message">No events planned.</p>
            )}
            {months}
          </div>
          {panelOpened && <Modal />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  loggedUser: state.auth.loggedUser,
  panelOpened: state.calendar.panelOpened
});

EventsList.propTypes = {
  events: PropTypes.array,
  loggedUser: PropTypes.string,
  panelOpened: PropTypes.bool,
  getEvents: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  openPanel: PropTypes.func.isRequired,
  selectEvent: PropTypes.func.isRequired
};

export default Loader(
  AuthHoc(
    connect(
      mapStateToProps,
      { getEvents, deleteEvent, openPanel, selectEvent }
    )(EventsList)
  )
);
