import axios from 'axios';

import * as types from './constants';

export const clearInput = () => ({ type: types.CLEAR_INPUT });
export const clearCountries = () => ({ type: 'COUNTRIES/CLEAR_VALUE' });

export const handleInput = (field, value) => ({
  type: types.HANDLE_INPUT,
  field,
  value,
});

export const handleValidation = (field, value) => ({
  type: types.HANDLE_VALIDATION,
  field,
  value,
});

export const submit = form => (dispatch) => {
  dispatch({ type: types.SUBMIT_REQUEST });
  return axios.post('/api/v1/assessment', form)
  .then((res) => {
    dispatch({ type: types.SUBMIT_SUCCESS, data: res.data });
    return res.data.status;
  })
  .catch((err) => {
    dispatch({ type: types.SUBMIT_FAILURE, data: err });
    return false;
  });
};

export const handleShowMessage = (message, delay) => (dispatch) => {
  const timeout = delay * 1000 || 4000;
  dispatch({ type: 'INFOBAR/HANDLE_SHOW', message });
  setTimeout(() => dispatch({ type: 'INFOBAR/HANDLE_HIDE' }), timeout);
};
