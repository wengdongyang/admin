/** @format */
// apis
// hooks
// utils
import { requestGet, requestPost } from '@src/utils';

// stores
// mixins
// configs
// components
// 获取验证码
export const apiGetCaptchaImage = () => {
  return requestGet({
    url: '/captchaImage',
  });
};
// 登录方法 - 平台
export const apiPostLoginPlatform = (data: any) => {
  return requestPost({
    url: '/loginPlatform',
    data,
  });
};
// 登录方法 - 租户
export const apiPostLoginTenant = (data: any) => {
  return requestPost({
    url: '/loginTenant',
    data,
  });
};
// 登录方法 - 子用户
export const apiPostLoginSonTenant = (data: any) => {
  return requestPost({
    url: '/loginSonTenant',
    data,
  });
};
// 获取用户信息
export const apiGetGetInfo = () => {
  return requestGet({
    url: '/getInfo',
  });
};
