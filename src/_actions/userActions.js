/* eslint-disable import/prefer-default-export */
import { USERACTIONS } from '../_constants';
import { getData, APIS } from '../_services';

const { SET_USERJOBBIDS, SET_LOADING, SET_ALERT } = USERACTIONS;

export const actionCreator = (type, payload) => {
  console.log(type, payload);
  return { type, payload };
};

export const setAlert = payload => actionCreator(SET_ALERT, payload);
export const setUserJobBids = (jobId) => {
  const { baseUrl, getJobBids: { method, path } } = APIS;
  const url = `${baseUrl}${path(jobId)}`;
  return async (dispatch) => {
    dispatch(actionCreator(SET_LOADING, 'getJobBids'));
    const response = await getData(method, url);
    console.log(response);
    console.log(url, response);
    if (response.meta && response.meta.status === 200) {
      dispatch(actionCreator(SET_USERJOBBIDS, response.data));
    }
    dispatch(actionCreator(SET_LOADING, ''));
  };
};
