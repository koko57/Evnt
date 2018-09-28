import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../actions/eventsActions';
import { selectDate, closePanel, changeMode } from '../actions/calendarActions';
import './EditorPanel.scss';
import AddEvent from './AddEvent';
import PanelEventList from './PanelEventList';
import dateFns from 'date-fns';
import Icon from 'react-materialize/lib/Icon';

class EditorPanel extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.changeMode(e);
  }

  render() {
    const { mode, selectedDate, selectedEvent, events } = this.props;
    const dayEvents = events.filter(e =>
      dateFns.isSameDay(e.date, this.props.selectedDate)
    );
    let date = selectedDate || selectedEvent.date;
    date = dateFns.format(date, 'dddd, D MMMM');
    return (
      <div className="editor-window">
        <div className="editor-panel">
          <span className="icon--close" onClick={this.props.closePanel}>
            <Icon>clear</Icon>
          </span>
          <h5>{date}</h5>
          {(dayEvents.length === 0 || mode === 'edit' || mode === 'add') && <AddEvent dates={dayEvents} />}
          {dayEvents.length !== 0 && mode !== 'edit' &&
            mode !== 'add' && <PanelEventList list={dayEvents} changePanel={this.handleClick} />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.calendar.selectedDate,
  selectedEvent: state.calendar.selectedEvent,
  panelOpened: state.calendar.panelOpened,
  mode: state.calendar.mode,
  events: state.events.events
});

export default connect(
  mapStateToProps,
  { getEvents, selectDate, closePanel, changeMode }
)(EditorPanel);
