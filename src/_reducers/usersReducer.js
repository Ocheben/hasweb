import { USERACTIONS } from '../_constants';

const initState = {
  userInfo: {
    phone: '',
  },
  shipments: []
};

const { ASSIGN } = USERACTIONS;

const assign = (state = initState, action) => {
  switch (action.type) {
    case ASSIGN:
      return state.shipments.map((item, index) => {
        if (index !== action.index) {
          // This isn't the item we care about - keep it as-is
          return item;
        }

        // Otherwise, this is the one we want - return an updated value
        return {
          ...item,
          ...action.item
        };
      });

    default: return state;
  }
};
export default assign;
