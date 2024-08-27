/** @format */
// apis
// hooks
// utils
import { requestGet, requestPost } from '@src/utils';
// stores
// mixins
// configs
import { ENV } from '@src/configs';
// components
// 获取验证码
export const apiGetCaptchaImage = () => {
  return requestGet({ baseURL: ENV.BASE_URL, url: '/captchaImage' });
};
// 登录方法 - 平台
export const apiPostLoginPlatform = (data: any) => {
  return requestPost({ baseURL: ENV.BASE_URL, url: '/loginPlatform', data });
};
// 登录方法 - 租户
export const apiPostLoginTenant = (data: any) => {
  return requestPost({ baseURL: ENV.BASE_URL, url: '/loginTenant', data });
};
// 获取用户信息
export const apiGetGetInfo = () => {
  return requestGet({ baseURL: ENV.BASE_URL, url: '/getInfo' });
};

// 获取用户信息
export const apiGetGetRouters = () => {
  return requestGet({ baseURL: ENV.BASE_URL, url: '/getRouters' });
};
