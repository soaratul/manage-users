import {
  ADDRESS_LIST_FAILURE,
  ADDRESS_LIST_REQUEST,
  ADDRESS_LIST_SUCCESS
} from './types';

const initialState = {
  list: []
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload
      };
    case ADDRESS_LIST_REQUEST:
    case ADDRESS_LIST_FAILURE:
      return {
        ...state,
        list: []
      };
    default:
      return state;
  }
};

export default addressReducer;
