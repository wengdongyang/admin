// apis
// utils
// types
// mixins
// stores
// configs
// components
const ENV_MODE = process.env.MODE || 'production'; // 模式

const ENV_TOKEN_KEY = process.env.VUE_APP_TOKEN_KEY || 'TOKEN'; // token的key
const ENV_MG_TOKEN_KEY = process.env.VUE_APP_MG_TOKEN_KEY || 'MG_TOKEN'; // token的key

export default {
  BASE_URL: '/town/adminapi',
  MODE: ENV_MODE,

  TOKEN_KEY: ENV_TOKEN_KEY, // token key
  MG_TOKEN_KEY: ENV_MG_TOKEN_KEY,
};
