import axios from 'axios';
import { GET_EVENTS, ADD_EVENT, DELETE_EVENT, EDIT_EVENT } from './actionTypes';
import { loading } from './calendarActions';

export const getEvents = user => dispatch => {
  axios
    .get(`/api/events/${user}`)
    .then(res => {
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      });
    })
    .then(() => dispatch(loading(false)));
};

export const addEvent = event => dispatch => {
  dispatch(loading(true))
  axios
    .post('/api/events/', event)
    .then(res => {
      dispatch({
        type: ADD_EVENT,
        payload: res.data
      });
    })
    .then(() => dispatch(loading(false)));
};

export const deleteEvent = id => dispatch => {
  dispatch(loading(true))
  axios
    .delete(`/api/events/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_EVENT,
        payload: id
      });
    })
    .then(() => dispatch(loading(false)));
};

export const editEvent = (id, event) => dispatch => {
  dispatch(loading(true))
  axios
    .put(`/api/events/${id}`, event)
    .then(res => {
      dispatch({
        type: EDIT_EVENT,
        id: id,
        payload: event
      });
    })
    .then(() => dispatch(getEvents(event.user)))
    .then(() => dispatch(loading(false)));
};
