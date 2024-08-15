/** @format */
// apis
// hooks
// utils

// stores
// mixins
// configs
// components
const ENV_MODE = import.meta.env.MODE || 'production'; // 模式

const ENV_BASE_URL = import.meta.env.BASE_URL || '/town/cms/'; // 项目的BASEURL

const ENV_TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || 'TOKEN'; // token的key
const ENV_MG_TOKEN_KEY = import.meta.env.VITE_MG_TOKEN_KEY || 'MG_TOKEN'; // token的key

const ENV_PLATFORM_USERNAME = import.meta.env.VITE_PLATFORM_USERNAME || ''; // admin的账号
const ENV_PLATFORM_PASSWORD = import.meta.env.VITE_PLATFORM_PASSWORD || ''; // admin的密码

export default {
  MODE: ENV_MODE,

  BASE_URL: ENV_BASE_URL, // 项目的base路由

  TOKEN_KEY: ENV_TOKEN_KEY, // token key
  MG_TOKEN_KEY: ENV_MG_TOKEN_KEY, // mgToken key

  PLATFORM_USERNAME: ENV_PLATFORM_USERNAME,
  PLATFORM_PASSWORD: ENV_PLATFORM_PASSWORD,
};
