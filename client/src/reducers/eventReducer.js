import {
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  EDIT_EVENT
} from '../actions/actionTypes';

const initialState = {
  events: [],
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
      case EDIT_EVENT:
      return {
        ...state,
        events: [...state.events.filter(event => event._id !== action.id), action.payload]
      };
    default:
      return {
        ...state
      };
  }
};
