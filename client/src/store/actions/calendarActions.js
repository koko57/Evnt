import {
  SELECT_DATE,
  SELECT_EVENT,
  OPEN_PANEL,
  CLOSE_PANEL,
  CHANGE_MODE,
  LOADING
} from './actionTypes';

export const selectDate = date => dispatch => {
  dispatch({
    type: SELECT_DATE,
    payload: date
  });
};

export const selectEvent = event => dispatch => {
  dispatch({
    type: SELECT_EVENT,
    payload: event
  });
};

export const openPanel = () => dispatch => {
  dispatch({
    type: OPEN_PANEL
  });
};

export const closePanel = () => dispatch => {
  dispatch({
    type: CLOSE_PANEL
  });
};

export const changeMode = mode => dispatch => {
  dispatch({
    type: CHANGE_MODE,
    payload: mode
  });
};

export const loading = bool => dispatch => {
  dispatch({
    type: LOADING,
    payload: bool
  });
};
