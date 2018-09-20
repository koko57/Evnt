import {
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  SELECT_DATE
} from '../actions/actionTypes';

const initialState = {
  events: [],
  selectedDate: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events]
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event._id !== action.payload)
      };
    case SELECT_DATE:
      return {
        ...state,
        selectedDate: action.payload
      };
    default:
      return {
        ...state
      };
  }
};
