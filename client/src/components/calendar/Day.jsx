import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Day.scss';

const Day = ({
  sameMonth,
  monthsDiff,
  date,
  dayOfMonth,
  weekend,
  handleClick,
  events
}) => {
  const count = events.length;
  return (
    <div
      className={`day__cell ${
        !sameMonth
          ? monthsDiff < 0
            ? 'disabled prev'
            : 'disabled next'
          : weekend
          ? 'weekend'
          : ''
      }`}
      id={date}
      data-events={count}
      onClick={sameMonth ? handleClick : null}
      onKeyPress={handleClick}
      tabIndex={sameMonth ? '0' : '-1'}
    >
      {count > 0 ? (
        <i
          className="day__events material-icons"
          title={count === 1 ? '1 event' : `${count} events`}
        >
          panorama_fish_eye
        </i>
      ) : null}
      <span className="day__date">{dayOfMonth}</span>
    </div>
  );
};

const mapStateToProps = state => ({
  mode: state.calendar.mode
});

Day.propTypes = {
  sameMonth: PropTypes.bool,
  monthsDiff: PropTypes.number,
  date: PropTypes.object.isRequired,
  dayOfMonth: PropTypes.string,
  weekend: PropTypes.bool,
  handleClick: PropTypes.func,
  events: PropTypes.array
};

export default connect(mapStateToProps)(Day);
