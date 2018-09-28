import React from 'react';
import dateFns from 'date-fns';

const Day = ({
  sameMonth,
  monthsDiff,
  sameDate,
  date,
  dayOfMonth,
  handleClick,
  events
}) => {

  return (
    <div
      className={`day__cell ${
        !sameMonth
          ? monthsDiff < 0
            ? 'disabled prev'
            : 'disabled next'
          : sameDate
            ? 'selected'
            : ''
      }`}
      key={dateFns.format(date, 'D.MM')}
      id={date}
      onClick={sameMonth ? handleClick : null}
      data-events={events.length}
    >
    <span className="day__date">{dayOfMonth}</span>

    </div>
  );
};

export default Day;
