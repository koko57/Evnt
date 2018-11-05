import axios from 'axios';
import { SHOW_MESSAGE, SIGN_UP, SIGN_IN, SIGN_OUT } from './actionTypes';
import { push } from 'connected-react-router';

export const signIn = user => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/auth/login', user);
      const userID = res.data.user._id;
      dispatch({ type: SIGN_IN, payload: userID });
      dispatch(push('/'));
      localStorage.setItem('user', res.data.token);
    } catch (err) {
      dispatch({
        type: SHOW_MESSAGE,
        payload: 'Invalid email or password'
      });
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
      dispatch({
        type: SHOW_MESSAGE,
        payload: 'Account registered, sign in.'
      });
      dispatch(push('/login'));
    } catch (err) {
      dispatch({
        type: SHOW_MESSAGE,
        payload: 'Invalid email or password'
      });
      console.log(err);
    }
  };
};

export const signOut = () => dispatch => {
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

export const showMessage = msg => {
  return {
    type: SHOW_MESSAGE,
    payload: msg
  };
};
