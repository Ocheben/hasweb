/* eslint-disable import/prefer-default-export */
import { UICONSTANTS } from '../_constants';

export const toggleClient = payload => ({
  type: UICONSTANTS.TOGGLECLIENT,
  payload: payload > 0 ? 'seller' : 'client'
});
