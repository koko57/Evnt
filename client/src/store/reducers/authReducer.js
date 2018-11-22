import { SIGN_UP, SIGN_IN, SIGN_OUT, SHOW_MESSAGE, SET_CURRENT_USER } from '../actions/actionTypes';

const initialState = {
  logged: false,
  loggedUser: '',
  message: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, logged: true, loggedUser: action.payload };
    case SIGN_UP:
      return { ...state };
    case SIGN_OUT:
      return { ...state, logged: false, loggedUser: ''};
    case SHOW_MESSAGE:
      return { ...state, message: action.payload};
    case SET_CURRENT_USER:
      return { ...state, logged: true, loggedUser: action.payload};
    default:
      return state;
  }
}
