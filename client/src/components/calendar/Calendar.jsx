import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEvents } from '../../store/actions/eventsActions';
import {
  selectDate,
  openPanel,
  changeMode
} from '../../store/actions/calendarActions';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isSameMonth,
  isWeekend,
  compareAsc,
  subDays,
  subMonths,
  addDays,
  addMonths
} from 'date-fns';
import Navbar from '../layout/Navbar';
import Modal from '../editor/Modal';
import AuthHoc from '../hoc/AuthHoc';
import Loader from '../hoc/Loader';
import Day from './Day';
import CalendarHeader from './CalendarHeader';
import './Calendar.scss';

class Calendar extends Component {
  state = {
    currentMonth: new Date()
  };

  componentDidMount() {
    this.props.getEvents(this.props.loggedUser);
  }

  renderCells() {
    const { currentMonth } = this.state;
    const { events, selectedDate } = this.props;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const rows = [];
    let days = [];
    let date = startDate;
    let dayOfMonth, sameDate, sameMonth, monthsDiff, checkWeekend;
    const filterEvents = (events, day) => {
      return events.filter(e => isSameDay(e.date, day));
    };
    let dayEvents;

    while (date <= endDate) {
      for (let i = 0; i < 7; i++) {
        dayOfMonth = format(date, 'd');
        sameDate = isSameDay(date, selectedDate);
        sameMonth = isSameMonth(date, monthStart);
        monthsDiff = compareAsc(date, monthStart);
        dayEvents = filterEvents(events, date);
        checkWeekend = isWeekend(date);
        days.push(
          <Day
            date={date}
            sameMonth={sameMonth}
            monthsDiff={monthsDiff}
            sameDate={sameDate}
            weekend={checkWeekend}
            dayOfMonth={dayOfMonth}
            handleClick={this.handleClick}
            handleKeyPress={this.handleKeyPress}
            events={dayEvents}
            key={date}
          />
        );
        date = addDays(date, 1);
      }
      rows.push(
        <div className="calendar__week-row" key={subDays(date, 7)}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar__body">{rows}</div>;
  }

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };

  handleClick = e => {
    const { selectDate, changeMode, openPanel } = this.props;
    const selected = e.currentTarget;
    let newDate = selected.id;
    selectDate(newDate);
    selected.dataset.events === '0' ? changeMode('add') : changeMode('view');
    openPanel();
  };

  handleKeyPress = (e, fn) => {
    const code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      fn();
    }
  };

  render() {
    return (
      <div className="main">
        <Navbar />
        {this.props.panelOpened && (
          <Modal handleKeyPress={this.handleKeyPress} />
        )}
        <div className="calendar">
          <CalendarHeader
            currentMonth={this.state.currentMonth}
            prevMonth={this.prevMonth}
            nextMonth={this.nextMonth}
            handleKeyPress={this.handleKeyPress}
          />
          {this.renderCells()}
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  selectedDate: PropTypes.string,
  events: PropTypes.array,
  panelOpened: PropTypes.bool,
  getEvents: PropTypes.func,
  selectDate: PropTypes.func,
  openPanel: PropTypes.func,
  changeMode: PropTypes.func
};

const mapStateToProps = state => ({
  selectedDate: state.events.selectedDate,
  events: state.events.events,
  panelOpened: state.calendar.panelOpened,
  loggedUser: state.auth.loggedUser
});

export default Loader(
  AuthHoc(
    connect(
      mapStateToProps,
      { getEvents, selectDate, openPanel, changeMode }
    )(Calendar)
  )
);
