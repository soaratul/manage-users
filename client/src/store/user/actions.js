import { ApiPaths } from '../../constants';
import ApiService from '../../utils/axios';
import { LOGIN, LOGOUT } from './types';

export const login = (requestBody) => {
  return async (dispatch) => {
    try {
      await ApiService.post(ApiPaths.LOGIN, requestBody);
      // call me api after successfull login
      const userRes = await ApiService.get(ApiPaths.ME);

      dispatch({
        type: LOGIN,
        payload: userRes.data
      });
    } catch (error) {
      dispatch({
        type: LOGOUT,
        payload: error.error.message
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await ApiService.post(ApiPaths.LOGOUT);
      dispatch({
        type: LOGOUT,
        payload: {}
      });
    } catch (error) {
      dispatch({
        type: LOGOUT
      });
    }
  };
};

export const getMe = () => {
  return async (dispatch) => {
    try {
      const user = await ApiService.get(ApiPaths.ME);
      dispatch({
        type: LOGIN,
        payload: user.data
      });
    } catch (error) {
      dispatch({
        type: LOGOUT
      });
    }
  };
};

export const setEditRow = (rowData) => {
  console.log('Row data in store action', rowData);
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: { editRow: rowData }
    });
  };
};
