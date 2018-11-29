import React from 'react';
import PropTypes from 'prop-types';
import { format, startOfWeek, addDays } from 'date-fns';
import './CalendarHeader.scss';

const CalendarHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
  handleKeyPress
}) => {
  const days = [];
  const dateFormat = window.innerWidth > 480 ? 'EEE' : 'EEEEE';
  let startDate = startOfWeek(currentMonth, {
    weekStartsOn: 1
  });
  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="calendar-header__day" key={i}>
        {format(addDays(startDate, i), dateFormat)}
      </div>
    );
  }
  return (
    <div className="calendar-header">
      <div className="calendar-header__main">
        <button
          className="calendar-header__button"
          onKeyPress={handleKeyPress(prevMonth)}
          onClick={prevMonth}
          title="Previous month"
        >
          <i className="calendar-header__icon material-icons">chevron_left</i>
        </button>
        <div className="calendar-header__item">
          <h2 className="calendar-header__month">
            {format(currentMonth, 'MMMM YYYY', { awareOfUnicodeTokens: true })}
          </h2>
        </div>
        <button
          className="calendar-header__button"
          onKeyPress={nextMonth}
          onClick={nextMonth}
          title="Next month"
        >
          <i className="calendar-header__icon material-icons">chevron_right</i>
        </button>
      </div>
      <div className="calendar-header__week">{days}</div>
    </div>
  );
};

CalendarHeader.propTypes = {
  currentMonth: PropTypes.object.isRequired,
  prevMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func
};

export default CalendarHeader;
