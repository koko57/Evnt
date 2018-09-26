import { combineReducers } from 'redux';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({
  events : eventReducer
});

export default rootReducer;
