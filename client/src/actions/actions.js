import axios from 'axios';
import {
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  SELECT_DATE
} from './actionTypes';

// const axios = require('axios');

export const getEvents = () => dispatch => {
  axios.get('/api/events').then(res => {
    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  });
};

export const addEvent = event => dispatch => {
  axios.post('/api/events', event).then(res => {
    dispatch({
      type: ADD_EVENT,
      payload: res.data
    });
  });
};

export const deleteEvent = id => dispatch => {
  axios.delete(`/api/events/${id}`).then(res => {
    dispatch({
      type: DELETE_EVENT,
      payload: id
    });
  });
};

export const selectDate = date => dispatch => {
  dispatch({
    type: SELECT_DATE,
    payload: date
  });
};
