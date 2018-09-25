import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectDate, getEvents } from '../actions/actions';
import './EditorPanel.scss';
import AddEvent from './AddEvent';
import PanelEventList from './PanelEventList';
import dateFns from 'date-fns';
import { Input, Button } from 'react-materialize';
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

    return (
      <div className="editor-window">
        <div className="editor-panel">
          <span
            className="icon__close"
            onClick={() => this.props.selectDate('')}
          >
            <Icon>clear</Icon>
          </span>
          <div className="panel-navbar">
            <a href="#" id="event" onClick={this.handleClick}>
              Events
            </a>
            <a href="#" id="add"  onClick={this.handleClick}>
              Add New
            </a>
          </div>

          {panel === 'add' && <AddEvent dates={events} />}
          {panel === 'event' && <PanelEventList list={events} />}
        </div>
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
  { getEvents, selectDate }
)(EditorPanel);
