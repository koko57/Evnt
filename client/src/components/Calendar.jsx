import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-materialize';
import { getEvents } from '../actions/eventsActions';
import { selectDate, openPanel, changeMode } from '../actions/calendarActions';
import dateFns from 'date-fns';
import './Calendar.scss';
import EditorPanel from './EditorPanel';
import Day from './Day';

class Calendar extends Component {
  state = {
    currentMonth: new Date()
  };

  componentDidMount() {
    this.props.getEvents();
  }

  renderHeader() {
    return (
      <div className="caledar__header header">
        <div className="header__item" onClick={this.prevMonth}>
          <Icon>chevron_left</Icon>
        </div>
        <div className="header__item">
          {dateFns.format(this.state.currentMonth, 'MMMM YYYY')}
        </div>
        <div className="header__item" onClick={this.nextMonth}>
          <Icon>chevron_right</Icon>
        </div>
      </div>
    );
  }

  renderDays() {
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.currentMonth, {
      weekStartsOn: 1
    });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="calendar__day" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), 'ddd')}
        </div>
      );
    }
    return <div className="calendar__week">{days}</div>;
  }

  // TODO: separate component with events icons
  renderCells() {
    const { currentMonth } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = dateFns.endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let date = startDate;
    let dayOfMonth;
    let sameDate;
    let sameMonth;
    let monthsDiff;
    const filterEvents = (events, day) => {
      return events.filter(e => dateFns.isSameDay(e.date, day))
    }
    let dayEvents;

    while (date <= endDate) {
      for (let i = 0; i < 7; i++) {
        dayOfMonth = dateFns.format(date, 'D');
        sameDate = dateFns.isSameDay(date, this.props.selectedDate);
        sameMonth = dateFns.isSameMonth(date, monthStart);
        monthsDiff = dateFns.compareAsc(date, monthStart);
        dayEvents = filterEvents(this.props.events, date)

        days.push(
          <Day
            sameMonth={sameMonth}
            monthsDiff={monthsDiff}
            sameDate={sameDate}
            date={date}
            dayOfMonth={dayOfMonth}
            handleClick={this.handleClick}
            events={dayEvents}
          />
        );
        date = dateFns.addDays(date, 1);
      }
      rows.push(
        <div className="calendar__week-row" key={dateFns.subDays(date, 7)}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar__body">{rows}</div>;
  }
  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };
  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  handleClick = e => {
    const selected = e.currentTarget
    let newDate = selected.id;
    console.log(selected.dataset.events);
    this.props.selectDate(newDate);
    selected.dataset.events === 0 ? this.props.changeMode('add') : this.props.changeMode('view');
    this.props.openPanel();
  };

  render() {
    return (
      <div className="main">
        {this.props.panelOpened && <EditorPanel />}
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.events.selectedDate,
  events: state.events.events,
  panelOpened: state.calendar.panelOpened
});

export default connect(
  mapStateToProps,
  { getEvents, selectDate, openPanel, changeMode }
)(Calendar);
