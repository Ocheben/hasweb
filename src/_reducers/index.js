import { combineReducers } from 'redux';
import saveUser from './authReducer';
import uiReducer from './uiReducer';

const reducers = {
  saveUser,
  uiReducer
};

const rootReducer = combineReducers({
  ...reducers
});

export default rootReducer;
