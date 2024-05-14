import { LOGIN, LOGOUT } from './types';

const initialState = {
  isLoggedIn: false,
  id: '',
  email: '',
  loginError: '',
  editRow: { id: null }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload
      };
    case LOGOUT:
      return {
        ...state,
        ...initialState,
        loginError: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
