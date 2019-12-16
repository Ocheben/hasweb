import { AUTHACTIONS, USERACTIONS } from '../_constants';

const initState = {
  userInfo: {
    phone: '',
  }
};

const { LOGIN, LOGOUT, CREDITWALLET } = AUTHACTIONS;

const saveUser = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };

    case LOGOUT:
      return {
        ...state,
        userInfo: {}
      };

    case CREDITWALLET:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          walletBal: state.userInfo.walletBal + action.payload
        }
      };
    default: return state;
  }
};

export default saveUser;
