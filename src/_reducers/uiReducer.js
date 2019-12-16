import { UICONSTANTS } from '../_constants';

const { TOGGLECLIENT } = UICONSTANTS;

const initState = {
  userType: 'seller'
};

const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLECLIENT:
      return {
        ...state,
        userType: action.payload
      };
    default: return state;
  }
};

export default uiReducer;
