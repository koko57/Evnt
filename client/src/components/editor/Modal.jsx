import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isSameDay, format } from 'date-fns';
import { selectDate, closePanel } from '../../actions/calendarActions';
import EventForm from './EventForm';
import ModalEventsList from './ModalEventsList';
import './Modal.scss';

const Modal = props => {
  const { mode, events, selectedDate, closePanel } = props;
  const dayEvents = events.filter(e =>
    isSameDay(e.date, new Date(selectedDate))
  );
  let displayDate = format(new Date(selectedDate), 'eeee, d MMMM');

  return (
    <div className="modal__wrapper">
      <div className="modal__window">
        <i className="modal__icon material-icons" onClick={closePanel}>
          clear
        </i>
        {selectedDate && <h4 className="modal__header">{displayDate}</h4>}
        <div className="modal__body">
          {(mode === 'edit' || mode === 'add') && <EventForm />}
          {mode === 'view' && <ModalEventsList dayEvents={dayEvents} />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  selectedDate: state.calendar.selectedDate,
  selectedEvent: state.calendar.selectedEvent,
  panelOpened: state.calendar.panelOpened,
  mode: state.calendar.mode,
  events: state.events.events
});

Modal.propTypes = {
  selectedDate: PropTypes.string,
  selectedEvent: PropTypes.string,
  panelOpened: PropTypes.bool.isRequired,
  mode: PropTypes.string,
  events: PropTypes.array,
  selectDate: PropTypes.func.isRequired,
  closePanel: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { selectDate, closePanel }
)(Modal);
