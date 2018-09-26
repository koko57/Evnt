import React, { Component } from 'react';
import { getEvents, deleteEvent } from '../actions/actions';
import { connect } from 'react-redux';
import { Icon } from 'react-materialize';
import { format } from 'date-fns';
import _ from 'lodash';
import './EventsList.scss';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      events: []
    };
  }
  componentDidMount() {
    this.props.getEvents();
  }
  deleteEvent(e) {
    this.props.deleteEvent(e);
  }

  render() {
    let { events } = this.props;
    let months = _.uniq(events.map(e => format(e.date, 'MMMM')));

    const eventsLi = events.map(e => (
      <li
        className={`events-list__item row ${format(e.date, 'MMMM')}`}
        key={e._id}
      >
        <div className="col m4 s6">{e.name}</div>
        <div className="col m4 s6">{format(e.date, 'dddd, D MMMM')}</div>
        <div className="col m4 s12">
          <div onClick={this.deleteEvent.bind(this, e._id)}>
            <Icon>clear</Icon>
          </div>
          <div onClick={this.deleteEvent.bind(this, e._id)}>
            <Icon>edit</Icon>
          </div>
        </div>
      </li>
    ));
    months = months.map(month => (
      <ul className={`events-list__month ${month}`} key={month}>
        <h3>{month}</h3>
        {eventsLi.filter(e => e.props.className.includes(month))}
      </ul>
    ));
    return <div className="events-list container">{months}</div>;
  }
}

const mapStateToProps = state => ({
  events: state.events.events
});

export default connect(
  mapStateToProps,
  { getEvents, deleteEvent }
)(EventList);
