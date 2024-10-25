import axios from 'axios';
import NProgress from 'nprogress';
// apis
// hooks
// utils
import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
// stores
// configs
import { ENV } from '@src/configs';
// components
// 创建axios实例
const request = axios.create({
  timeout: 1000 * 10,
});
// request拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!NProgress.isStarted()) {
      NProgress.start();
    }

    const { headers, url = '' } = config;

    // 不需要token的白名单
    if (['/captchaImage', '/loginPlatform', '/loginTenant'].includes(url)) {
      return config;
    } else {
      const token = sessionStorage.getItem(ENV.TOKEN_KEY);
      if (!token) {
        console.error(`token不存在!`, token);
        return config;
      }
      return Object.assign({}, config, { headers: Object.assign({ Authorization: `Bearer ${token}` }, headers) });
    }
  },
  (error) => {
    if (NProgress.isRendered()) {
      NProgress.done();
    }

    return Promise.reject(error);
  },
);
// 响应拦截器
request.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    if (NProgress.isRendered()) {
      NProgress.done();
    }
    const { data } = response;
    return Promise.resolve(data);
  },
  (error: AxiosError) => {
    if (NProgress.isRendered()) {
      NProgress.done();
    }
    return Promise.reject(error.response?.data || {});
  },
);

export const requestGet = async <T = any>(option: AxiosRequestConfig) => {
  const res = await request(Object.assign({ method: 'GET' }, option));
  return res as unknown as T;
};

export const requestPost = async <T = any>(option: AxiosRequestConfig) => {
  const res = await request(Object.assign({ method: 'POST' }, option));
  return res as unknown as T;
};

export const requestDelete = async <T = any>(option: AxiosRequestConfig) => {
  const res = await request(Object.assign({ method: 'DELETE' }, option));
  return res as unknown as T;
};

export const requestPut = async <T = any>(option: AxiosRequestConfig) => {
  const res = await request(Object.assign({ method: 'PUT' }, option));
  return res as unknown as T;
};

export const requestDownload = async <T = any>(option: AxiosRequestConfig) => {
  const res = await request(Object.assign({ method: 'GET', responseType: 'blob' }, option));
  return res as unknown as T;
};

export const requestUpload = async <T = any>(option: AxiosRequestConfig) => {
  const res = await request(
    Object.assign({ method: 'POST', headersType: 'multipart/form-data', timeout: 1000 * 60 }, option),
  );
  return res as unknown as T;
};

const requestHeader = axios.create({
  timeout: 10000,
});
// request拦截器
requestHeader.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!NProgress.isStarted()) {
      NProgress.start();
    }
    return config;
  },
  (error) => {
    if (NProgress.isRendered()) {
      NProgress.done();
    }
    return Promise.reject(error);
  },
);
// 响应拦截器
requestHeader.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    if (NProgress.isRendered()) {
      NProgress.done();
    }
    const { status, data } = response;
    if (status === 200) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(response);
    }
  },
  (error: AxiosError) => {
    if (NProgress.isRendered()) {
      NProgress.done();
    }
    return Promise.resolve(error);
  },
);

export { request, requestHeader };
