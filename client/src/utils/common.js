import { ApiPaths } from '../constants';
import HttpStatusCode from '../constants/http-status-codes';
import ApiService from './axios';

export const isBrowser = () => {
  return typeof window !== 'undefined';
};

export const isServer = () => {
  return typeof window === 'undefined';
};

export const isBackendUpAndRunning = async () => {
  try {
    const awakeStatus = await ApiService.get(ApiPaths.AWAKE);
    if (awakeStatus.status === HttpStatusCode.Ok) return true;
    return false;
  } catch (error) {
    return false;
  }
};

export const me = async () => {
  let defaultResult = {
    isLoggedIn: false
  };
  try {
    const user = await ApiService.get(ApiPaths.ME);

    if (user.status === HttpStatusCode.Ok)
      return { isLoggedIn: true, ...user.data };
    return defaultResult;
  } catch (error) {
    return defaultResult;
  }
};

export const bootApp = async () => {
  return {
    awakeStatus: await isBackendUpAndRunning(),
    user: await me()
  };
};

export const capitalizeFirstLetter = (string) => {
  return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
};

export const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const numericRangeArray = (start, end, step = 1, asc = true) => {
  let output = [];
  for (let i = start; i <= end; i += step) {
    output.push(i);
  }
  if (!asc) output.sort((a, b) => b - a);
  return output;
};

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
