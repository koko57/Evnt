import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectDate, getEvents } from '../actions/actions';
import './EditorPanel.scss';
import AddEvent from './AddEvent';
import PanelEventList from './PanelEventList';
import dateFns from 'date-fns';
import Icon from 'react-materialize/lib/Icon';

class EditorPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panel: '',
      events: []
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const events = this.props.events.filter(e =>
      dateFns.isSameDay(e.date, this.props.selectedDate)
    );
    let panel;
    events.length === 0 ? (panel = 'add') : (panel = 'event');
    this.setState({
      panel,
      events
    });
  }

  handleClick(e) {
    this.setState({
      panel: e.target.id
    });
  }

  render() {
    const { panel, events } = this.state;
    const date = dateFns.format(this.props.selectedDate, 'dddd, D MMMM')
    return (
      <div className="editor-window">
        <div className="editor-panel">
          <span
            className="icon--close"
            onClick={() => this.props.selectDate('')}
          >
            <Icon>clear</Icon>
          </span>
          <div className="editor-panel__navbar">
            <div id="add" onClick={this.handleClick} className={panel === 'add' ? 'navbar__item active' : 'navbar__item'}>
              Add New Event
            </div>
            <div id="event" onClick={this.handleClick} className={panel === 'event' ? 'navbar__item active' : 'navbar__item'}>
              Events
            </div>
          </div>
          <h5>{date}</h5>
          {panel === 'add' && <AddEvent dates={events} />}
          {panel === 'event' && <PanelEventList list={events} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.events.selectedDate,
  events: state.events.events
});

export default connect(
  mapStateToProps,
  { getEvents, selectDate }
)(EditorPanel);
