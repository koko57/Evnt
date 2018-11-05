import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import calendarReducer from './calendarReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  events: eventReducer,
  calendar: calendarReducer,
  auth: authReducer,
});

export default rootReducer;
