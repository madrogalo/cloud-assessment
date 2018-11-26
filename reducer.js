import { combineReducers } from 'redux';
import * as types from './constants';

const initialState = {
  input: {
    name:        '',
    lastName:    '',
    email:       '',
    companyName: '',
    sizeCompany: '',
    jobTitle:    '',
    phone:       '',
    country:     '',
    callTime:    '',
    recaptcha:   '',
  },
  validation: {
    name: {
      message: '',
      isValid: true,
    },
    lastName: {
      message: '',
      isValid: true,
    },
    email: {
      message: '',
      isValid: true,
    },
    companyName: {
      message: '',
      isValid: true,
    },
    sizeCompany: {
      message: '',
      isValid: true,
    },
    jobTitle: {
      message: '',
      isValid: true,
    },
    phone: {
      message: '',
      isValid: true,
    },
    callTime: {
      message: '',
      isValid: true,
    },
    country: {
      message: '',
      isValid: true,
    },
  },
  isSubmitting: false,
};

export default combineReducers({
  input: (state = initialState.input, action) => {
    switch (action.type) {
      case types.HANDLE_INPUT:
        return {
          ...state,
          [action.field]: action.value,
        };
      case types.CLEAR_INPUT:
        return initialState.input;
      default:
        return state;
    }
  },
  validation: (state = initialState.validation, action) => {
    switch (action.type) {
      case types.HANDLE_VALIDATION:
        return {
          ...state,
          [action.field]: {
            isValid: false,
            message: action.value,
          },
        };
      default:
        return state;
    }
  },
  isSubmitting: (state = initialState.isSubmitting, action) => {
    switch (action.type) {
      case types.SUBMIT_REQUEST:
        return true;
      case types.SUBMIT_SUCCESS:
      case types.SUBMIT_FAILURE:
        return false;
      default:
        return state;
    }
  },
});
