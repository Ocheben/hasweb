import { AUTHACTIONS, USERACTIONS } from '../_constants';

const initState = {
  userInfo: {
    phone: '',
  },
  initSignup: {}
};

const { LOGIN, LOGOUT, CREDITWALLET, DEBITWALLET, INIT_SINGUP } = AUTHACTIONS;

const saveUser = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };

    case INIT_SINGUP:
      return {
        ...state,
        initSignup: action.payload
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

    case DEBITWALLET:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          walletBal: state.userInfo.walletBal - action.payload
        }
      };
    default: return state;
  }
};

export default saveUser;
