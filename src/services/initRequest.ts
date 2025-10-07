import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { setShowSpinner } from "../redux/appSlice";
import { PATH } from "../configs";


export interface CustomAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
  headers: AxiosRequestHeaders;
  showSpinner?: boolean
}

const requestConfig = {
  // baseURL: 'https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app',
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  showSpinner: true
}

export const httpRequest = axios.create(requestConfig);

export function initRequest(store: any) {
  httpRequest.interceptors.request.use((config: CustomAxiosRequestConfig) => {
    config.headers['Content-Type'] = 'application/json';

    if(config.showSpinner) {
      store.dispatch(setShowSpinner(true))
    }

    const access_token =  window.localStorage.getItem('access_token');
    if(access_token) {
      config.headers['x-auth-token'] = access_token;
    }

    return config;
  }, function (error) {
    console.log('request error: ', error);
    return Promise.reject(error);
  });

  httpRequest.interceptors.response.use((response: any) => {
    const showSpinner = response.config.showSpinner;

    console.log('response: ', response);

    if (showSpinner) {
      store.dispatch(setShowSpinner(false))
    }
    return response.data;
  }, async function (error: any) {
    if (error.config.showSpinner) {
      store.dispatch(setShowSpinner(false))
    }

    // timeout
    if (error.code === "ECONNABORTED") {
      // code logic
    }

    // access token expired & refresh token
    if (error.status === 401) {
      try {
        const result = await httpRequest('/api/user/refresh-token', {
          method: 'POST',
          data: {
            data: {
              refresh_token: window.localStorage.getItem('refresh_token')
            }
          }
        });
        const access_token = result.data?.data.access_token;
        if(access_token) {
          window.localStorage.setItem('access_token', result.data.data.access_token);
          httpRequest.defaults.headers.common['x-auth-token'] = access_token;
          return httpRequest(error.config);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    }

    // handle errors
    switch (error.status) {
      case 403: {
        // xxxx
        window.location.href = PATH.RESTRICT_ACCESS_PAGE;
        break;
      }
      default:
        break
    }

    return Promise.reject(error);
  });
}