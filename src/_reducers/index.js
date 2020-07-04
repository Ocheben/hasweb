import { combineReducers } from 'redux';
import userInfo from './authReducer';
import uiReducer from './uiReducer';
import userData from './userReducer';

const reducers = {
  userInfo,
  uiReducer,
  userData
};

const rootReducer = combineReducers({
  ...reducers
});

export default rootReducer;
