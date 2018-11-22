import axios from 'axios';
import {
  SHOW_MESSAGE,
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  SET_CURRENT_USER
} from './actionTypes';
import { push } from 'connected-react-router';

export const signIn = user => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/auth/login', user);
      const userID = res.data.user._id;
      dispatch({ type: SIGN_IN, payload: userID });
      localStorage.setItem('user', res.data.token);
      dispatch(push('/'));
    } catch (err) {
      dispatch(showMessage('Invalid email or password.'));
      console.log(err);
    }
  };
};

export const signUp = user => {
  return async dispatch => {
    try {
      await axios.post('/api/auth/register', user);
      dispatch({
        type: SIGN_UP
      });
      dispatch(showMessage('Account registered, sign in.'));
      dispatch(push('/login'));
    } catch (err) {
      dispatch(showMessage('Invalid email or password.'));
      console.log(err);
    }
  };
};

export const signOut = () => {
  localStorage.clear();
  return async dispatch => {
    try {
      await axios.get('/api/auth/logout');
      dispatch({
        type: SIGN_OUT
      });
      dispatch(push('/welcome'));
    } catch (error) {
      console.log(error);
    }
  };
};

export const showMessage = msg => dispatch => {
  dispatch({
    type: SHOW_MESSAGE,
    payload: msg
  });
};

export const setCurrentUser = user => dispatch => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: user
  });
};
