import {
  BG_SERVICE_FAILURE,
  BG_SERVICE_REQUEST,
  BG_SERVICE_SUCCESS
} from './types';

const initialState = {
  status: 'INACTIVE'
};

const backendServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case BG_SERVICE_SUCCESS:
      return {
        ...state,
        status: 'ACTIVE'
      };
    case BG_SERVICE_REQUEST:
    case BG_SERVICE_FAILURE:
      return {
        ...state,
        status: 'INACTIVE'
      };
    default:
      return state;
  }
};

export default backendServiceReducer;
