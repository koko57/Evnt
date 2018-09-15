const axios = require('axios');

export const GET_EVENTS = 'GET_EVENTS';
export const ADD_EVENT = 'ADD_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';

export const getEvents = () => dispatch => {
  axios.get('/api/events').then(res => {
    dispatch( {
        type: GET_EVENTS,
        payload: res.data
    })
  });
};

export const addEvent = event => dispatch => {
  axios.post('/api/events', event).then(res => {
    dispatch( {
        type: ADD_EVENT,
        payload: res.data
    })
  });
};

export const deleteEvent = id => dispatch => {
  axios.delete(`/api/events/${id}`, event).then(res => {
    dispatch( {
        type: DELETE_EVENT,
        payload: id
    })
  });
};
