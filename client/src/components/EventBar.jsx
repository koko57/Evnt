import React, { Component } from 'react';
import dateFns from 'date-fns';
import { Icon } from 'react-materialize';
import { connect } from 'react-redux';
import { getEvents, deleteEvent } from '../actions/eventsActions';
import _ from 'lodash';
import { selectEvent, openPanel, changeMode } from '../actions/calendarActions';

class EventBar extends Component {
  constructor(props) {
    super(props);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  deleteEvent(e) {
    this.props.deleteEvent(e.currentTarget.parentNode.id);
  }
  handleClick(e) {
    const id = e.currentTarget.parentNode.id;
    const selectedEvent = _.find(this.props.events, e => e._id === id);
    console.log(e.target.parentNode.id);
    this.props.selectEvent(selectedEvent);
    this.props.changeMode('edit');
    this.props.openPanel();
  }
  render() {
    return (
      <div>
        <div className="col m4 s6">{this.props.name}</div>
        {this.props.date && (
          <div className="col m4 s6">
            {dateFns.format(this.props.date, 'dddd, D MMMM')}
          </div>
        )}
        <div className="col m4 s12" id={this.props.id}>
          <div onClick={this.deleteEvent}>
            <Icon>clear</Icon>
          </div>
          <div onClick={this.handleClick}>
            <Icon>edit</Icon>
          </div>
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

export default connect(
  mapStateToProps,
  { getEvents, deleteEvent, selectEvent, openPanel, changeMode }
)(EventBar);
