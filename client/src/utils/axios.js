import axios from 'axios';
import { ApiPaths } from '../constants';
import HttpStatusCode from '../constants/http-status-codes';

const instance = axios.create({
  baseURL: ApiPaths.BASE_URL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data.data
    };
  },
  async (error) => {
    console.log('error in axios lib', error);
    const originalRequest = error.config;
    if (error && error.code === 'ERR_NETWORK') {
      return instance(originalRequest);
    }

    if (
      error.response.data &&
      error.response.data.statusCode === HttpStatusCode.Forbidden &&
      error.response.data.error.message === 'ACCESS_TOKEN_EXPIRED' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await refreshAccessToken();
      return instance(originalRequest);
    }

    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    )
      return Promise.reject(error.response.data);
    return Promise.reject(error);
  }
);

const ApiService = {
  get: async (url = '') =>
    instance({
      method: 'GET',
      url
    }),
  post: async (url, data = {}) =>
    instance({
      method: 'POST',
      url,
      data
    }),
  put: async (url, data = {}) =>
    instance({
      method: 'PUT',
      url,
      data
    }),
  patch: async (url) =>
    instance({
      method: 'PATCH',
      url
    }),
  delete: async (url) =>
    instance({
      method: 'DELETE',
      url
    })
};

async function refreshAccessToken() {
  try {
    await ApiService.post(ApiPaths.REFRES_TOKEN);
  } catch (error) {
    console.log('refresh-token-error', error);
  }
}

export default ApiService;
