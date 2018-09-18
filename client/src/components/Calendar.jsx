import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectDate } from '../actions/actions';
import dateFns from 'date-fns';
import './Calendar.scss';

class Calendar extends Component {
  state = {
    currentMonth: new Date()
  };


  renderHeader() {
    const dateFormat = 'MMMM YYYY';
    return (
      <div className="caledar--header">
        {dateFns.format(this.state.currentMonth, dateFormat)}
      </div>
    );
  }

  renderDays() {
    const dateFormat = 'ddd';
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="calendar--day" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="calendar--week">{days}</div>;
  }

  renderCells() {
    const { currentMonth } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'D';
    const rows = [];

    let days = [];
    let date = startDate;
    let formattedDate;

    while (date <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(date, dateFormat);
        days.push(
          <div
            className={`day--cell ${
              !dateFns.isSameMonth(date, monthStart)
                ? 'disabled'
                : dateFns.isSameDay(date, this.props.selectedDate)
                  ? 'selected'
                  : ''
            }`}
            key={dateFns.format(date, 'D.MM')}
            id={date}
            onClick={this.handleClick}
          >
            <span className="day--date">{formattedDate}</span>
            <Link className="icon" to={'/add-event'}>+</Link>
          </div>
        );
        date = dateFns.addDays(date, 1);
      }
      rows.push(
        <div className="calendar--week-row" key={dateFns.subDays(date, 7)}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar--body">{rows}</div>;
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
    let newDate = dateFns.parse(e.target.id);
    console.log(newDate);
    this.props.selectDate(newDate);
    console.log('submit', this.state);
    console.log(this.props);
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.selectedDate
});

export default connect(
  mapStateToProps,
  { selectDate }
)(Calendar);
