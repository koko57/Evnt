import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-materialize';
import { getEvents, selectDate } from '../actions/actions';
import dateFns from 'date-fns';
import './Calendar.scss';
import EditorPanel from './EditorPanel';

class Calendar extends Component {
  state = {
    currentMonth: new Date()
  };

  componentDidMount() {
    this.props.getEvents();
  }

// TODO: separate component???
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
    let month;

    while (date <= endDate) {
      for (let i = 0; i < 7; i++) {
        dayOfMonth = dateFns.format(date, 'D');
        sameDate = dateFns.isSameDay(date, this.props.selectedDate);
        sameMonth = dateFns.isSameMonth(date, monthStart);
        month = dateFns.compareAsc(date, monthStart);
        days.push(
          <div
            className={`day__cell ${
              !sameMonth
                ? month < 0
                  ? 'disabled prev'
                  : 'disabled next'
                : sameDate
                  ? 'selected'
                  : ''
            }`}
            key={dateFns.format(date, 'D.MM')}
            id={date}
            onClick={sameMonth ? this.handleClick : null}
          >
            <span className="day__date">{dayOfMonth}</span>
          </div>
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
    let newDate = e.currentTarget.id;
    this.props.selectDate(newDate);
  };

  render() {
    return (
      <div className="main">
        {this.props.selectedDate && <EditorPanel events={this.props.events} />}
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
  events: state.events.events
});

export default connect(
  mapStateToProps,
  { getEvents, selectDate }
)(Calendar);
