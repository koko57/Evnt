import { combineReducers } from 'redux';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({
  eventReducer: eventReducer
});

export default rootReducer;
