/* eslint-disable import/prefer-default-export */
import { USERACTIONS } from '../_constants';

const { SET_LOADING, SET_USERJOBBIDS, SET_ALERT } = USERACTIONS;

export const initState = {
  userJobBids: [],
  loading: '',
  alert: {
    open: false,
    variant: 'info',
    message: ''
  }
};

const userData = (state = initState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case SET_ALERT:
      return {
        ...state,
        alert: { ...state.alert, ...action.payload }
      };

    case SET_USERJOBBIDS:
      return {
        ...state,
        userJobBids: action.payload
      };

    default: return state;
  }
};

export default userData;
