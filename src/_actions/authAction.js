import { AUTHACTIONS, USERACTIONS } from '../_constants';

const { LOGIN, LOGOUT, CREDITWALLET, INIT_SINGUP } = AUTHACTIONS;
const { ASSIGN, PICKUP, DELIVER, SET_USERJOBBIDS } = USERACTIONS;

export const saveUser = userData => ({
  type: LOGIN,
  payload: userData
});

export const creditWallet = payload => ({
  type: CREDITWALLET,
  payload
});

export const setJobBids = payload => ({
  type: SET_USERJOBBIDS,
  payload
});

export const initSignup = payload => ({
  type: INIT_SINGUP,
  payload
});

export const assignBiker = data => ({
  type: ASSIGN,
  payload: data
});

export const pickUp = data => ({
  type: PICKUP,
  payload: data
});

export const deliver = data => ({
  type: DELIVER,
  payload: data
});

export const removeUser = () => ({
  type: LOGOUT,
});
