import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import backendServiceReducer from './backend-service/reducer';
import addressReducer from './address/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  backendService: backendServiceReducer,
  address: addressReducer
});

export default rootReducer;
