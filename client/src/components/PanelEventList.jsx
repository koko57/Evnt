import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEvent, selectDate, getEvents } from '../actions/actions';
import './PanelEventList.scss';

import _ from 'lodash';
import dateFns from 'date-fns';
import { Input, Button } from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';

class PanelEventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: props.events
    };
  }
  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    const events = this.props.events.filter(e =>
      dateFns.isSameDay(e.date, this.props.selectedDate)
    );
    const eventsLi = events.map(e => (
      <li
        className={`events-list--item row ${dateFns.format(e.date, 'MMMM')}`}
        key={e._id}
      >
        <div className="col m4 s6">{e.name}</div>

        <div className="col m4 s12">
          <Icon>edit</Icon>
          <Icon>clear</Icon>
        </div>
      </li>
    ));

    return (
      <div className="event-panel">
        <h4>{dateFns.format(this.props.selectedDate, 'dddd, D MMMM')}</h4>
        {events.length === 0 && <p>No events on this day</p>}
        <ul>{eventsLi}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
  events: state.events
});

export default connect(
  mapStateToProps,
  { getEvents }
)(PanelEventList);
