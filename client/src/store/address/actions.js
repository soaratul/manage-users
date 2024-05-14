import { ApiPaths } from '../../constants';
import ApiService from '../../utils/axios';
import {
  ADDRESS_LIST_FAILURE,
  ADDRESS_LIST_REQUEST,
  ADDRESS_LIST_SUCCESS
} from './types';

export const getAdderssList = () => {
  return async (dispatch) => {
    dispatch({ type: ADDRESS_LIST_REQUEST });

    try {
      const result = await ApiService.get(ApiPaths.ADDRESS_LIST);
      dispatch({
        type: ADDRESS_LIST_SUCCESS,
        payload: result.data.items
      });
    } catch (error) {
      dispatch({
        type: ADDRESS_LIST_FAILURE
      });
    }
  };
};
