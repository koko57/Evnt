import axios from 'axios';
import { GET_EVENTS, ADD_EVENT, DELETE_EVENT, EDIT_EVENT } from './actionTypes';

export const getEvents = user => dispatch => {
  axios.get(`/api/events/${user}`).then(res => {
    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  });
};

export const addEvent = event => dispatch => {
  axios.post('/api/events/', event).then(res => {
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

export const editEvent = (id, event) => dispatch => {
  axios.put(`/api/events/${id}`, event).then(res => {
    dispatch({
      type: EDIT_EVENT,
      id: id,
      payload: event
    });
  });
};
