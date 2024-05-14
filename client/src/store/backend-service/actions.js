import { ApiPaths } from '../../constants';
import ApiService from '../../utils/axios';
import {
  BG_SERVICE_FAILURE,
  BG_SERVICE_REQUEST,
  BG_SERVICE_SUCCESS
} from './types';

export const checkIfBackendServiceRunning = () => {
  return async (dispatch) => {
    dispatch({ type: BG_SERVICE_REQUEST });
    try {
      await ApiService.get(ApiPaths.AWAKE);
      dispatch({
        type: BG_SERVICE_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: BG_SERVICE_FAILURE
      });
    }
  };
};
