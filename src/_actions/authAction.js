import { AUTHACTIONS, USERACTIONS } from '../_constants';

const { LOGIN, LOGOUT, CREDITWALLET } = AUTHACTIONS;
const { ASSIGN, PICKUP, DELIVER } = USERACTIONS;

export const saveUser = userData => ({
  type: LOGIN,
  payload: userData
});

export const creditWallet = payload => ({
  type: CREDITWALLET,
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
