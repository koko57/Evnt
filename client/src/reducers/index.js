import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import calendarReducer from './calendarReducer';

const rootReducer = combineReducers({
  events: eventReducer,
  calendar: calendarReducer
});

export default rootReducer;
