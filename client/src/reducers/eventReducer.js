import { GET_EVENTS, ADD_EVENT, REMOVE_EVENT } from '../actions/actions';

const initialState = {
  events: []
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [event, ...state.events]
      };
    case REMOVE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event._id !== action.id)
      };
  }
};
