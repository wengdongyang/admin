/** @format */
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import lodash from 'lodash';
import { defineStore } from 'pinia';
// apis
import { apiGetGetInfo } from '@src/apis';
// utils
// types
import {
  I_LOGIN_FORM_STATE,
  I_STORE_LOGIN_FORM_STATE,
  I_USER_TOKENS,
  I_STORE_USER_INFO,
  I_USER_INFO,
  I_ROUTER,
  I_ROUTER_TAB,
  I_STORE_SYSTEM,
} from './index.d';
// mixins
// stores
// configs
// components

export const useLoginFormState = defineStore('loginFormState', {
  state: (): I_STORE_LOGIN_FORM_STATE => {
    return {
      ADMIN_STORAGE_TIME: '', // 存储时间
      ADMIN_IS_REMEMBER: false, // 是否记住密码
      ADMIN_LOGIN_FORM_STATE: {}, // 账号密码

      TENANT_STORAGE_TIME: '', // 存储时间
      TENANT_IS_REMEMBER: false, // 是否记住密码
      TENANT_LOGIN_FORM_STATE: {}, // 账号密码
    };
  },
  getters: {
    adminStorageTime: (state: I_STORE_LOGIN_FORM_STATE) => lodash.get(state, ['ADMIN_STORAGE_TIME']) || '',
    adminIsRemember: (state: I_STORE_LOGIN_FORM_STATE) => lodash.get(state, ['ADMIN_IS_REMEMBER']) || false,
    adminLoginFormState: (state: I_STORE_LOGIN_FORM_STATE) => lodash.get(state, ['ADMIN_LOGIN_FORM_STATE']) || {},

    tenantStorageTime: (state: I_STORE_LOGIN_FORM_STATE) => lodash.get(state, ['TENANT_STORAGE_TIME']) || '',
    tenantIsRemember: (state: I_STORE_LOGIN_FORM_STATE) => lodash.get(state, ['TENANT_IS_REMEMBER']) || false,
    tenantLoginFormState: (state: I_STORE_LOGIN_FORM_STATE) => lodash.get(state, ['TENANT_LOGIN_FORM_STATE']) || {},
  },
  actions: {
    checkAdminLoginFormState() {
      try {
        const storageTime = this.ADMIN_STORAGE_TIME;
        const now = dayjs();
        if ((storageTime && now.subtract(1, 'week').isAfter(dayjs(storageTime))) || !storageTime) {
          this.ADMIN_IS_REMEMBER = false;
          this.ADMIN_STORAGE_TIME = '';
          this.ADMIN_LOGIN_FORM_STATE = {};
        }
      } catch (error) {
        console.warn(error);
      }
    },
    setAdminLoginFormState(adminLoginFormState: I_LOGIN_FORM_STATE) {
      try {
        if (adminLoginFormState && !lodash.isEmpty(adminLoginFormState)) {
          const storageTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
          const username = lodash.get(adminLoginFormState, ['username']);
          const password = lodash.get(adminLoginFormState, ['password']);
          this.ADMIN_IS_REMEMBER = true;
          this.ADMIN_LOGIN_FORM_STATE = { username, password };
          this.ADMIN_STORAGE_TIME = storageTime;
        } else {
          this.ADMIN_IS_REMEMBER = false;
          this.ADMIN_STORAGE_TIME = '';
          this.ADMIN_LOGIN_FORM_STATE = {};
        }
      } catch (error) {
        console.warn(error);
      }
    },
    checkTenantLoginFormState() {
      try {
        const storageTime = this.ADMIN_STORAGE_TIME;
        const now = dayjs();
        if ((storageTime && now.subtract(1, 'week').isAfter(dayjs(storageTime))) || !storageTime) {
          this.TENANT_IS_REMEMBER = false;
          this.TENANT_STORAGE_TIME = '';
          this.TENANT_LOGIN_FORM_STATE = {};
        }
      } catch (error) {
        console.warn(error);
      }
    },
    setTenantLoginFormState(tenantLoginFormState: I_LOGIN_FORM_STATE) {
      try {
        if (tenantLoginFormState && !lodash.isEmpty(tenantLoginFormState)) {
          const storageTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
          const username = lodash.get(tenantLoginFormState, ['username']);
          const password = lodash.get(tenantLoginFormState, ['password']);
          this.TENANT_IS_REMEMBER = true;
          this.TENANT_STORAGE_TIME = storageTime;
          this.TENANT_LOGIN_FORM_STATE = { username, password };
        } else {
          this.TENANT_IS_REMEMBER = false;
          this.TENANT_STORAGE_TIME = '';
          this.TENANT_LOGIN_FORM_STATE = {};
        }
      } catch (error) {
        console.warn(error);
      }
    },
  },
  persist: { storage: localStorage },
});

export const useUserInfo = defineStore('userinfo', {
  state: (): I_STORE_USER_INFO => {
    return {
      USER_TOKENS: {}, // userTokens
      USER_INFO: {}, // 用户信息
      USER_PERMISSIONS: [], // 用户权限
    };
  },
  getters: {
    token: (state: I_STORE_USER_INFO) => lodash.get(state, ['USER_TOKENS', 'token']) || '',
    mgToken: (state: I_STORE_USER_INFO) => lodash.get(state, ['USER_TOKENS', 'mgToken']) || '',

    userInfo: (state: I_STORE_USER_INFO) => lodash.get(state, ['USER_INFO']) || {},
    userPermissions: (state: I_STORE_USER_INFO) => lodash.get(state, ['USER_PERMISSIONS']) || {},

    isLogin: (state: I_STORE_USER_INFO) => {
      const userInfo = lodash.get(state, ['USER_INFO']) || {};
      return userInfo && !lodash.isEmpty(userInfo);
    },
  },
  actions: {
    setUserTokens(userTokens: I_USER_TOKENS) {
      try {
        const token = lodash.get(userTokens, ['token']);
        const mgToken = lodash.get(userTokens, ['mgToken']);

        this.USER_TOKENS = { token, mgToken };
      } catch (error) {
        console.warn(error);
      }
    },
    setUserInfoPermissions({ user, permissions }: { user: I_USER_INFO; permissions: string[] }) {
      try {
        this.USER_INFO = user;
        this.USER_PERMISSIONS = permissions;
      } catch (error) {
        console.warn(error);
      }
    },
  },
  persist: { storage: sessionStorage },
});

export const useSystem = defineStore('system', {
  state: (): I_STORE_SYSTEM => {
    return {
      COLLAPSED: false, // userTokens
      ROUTERS: [], // 所有的路由文件
      ROUTER_TABS: [], // tabs
      ACTIVE_ROUTER_TAB: {}, // 激活的tab
    };
  },
  getters: {
    collapsed: (state) => lodash.get(state, ['COLLAPSED']) || false,
    routers: (state) => lodash.get(state, ['ROUTERS']) || [],
    routerTabs: (state) => lodash.get(state, ['ROUTER_TABS']) || [],
    activeRouterTab: (state) => lodash.get(state, ['ACTIVE_ROUTER_TAB']) || {},
  },
  actions: {
    setCollapsed(collapsed: boolean) {
      try {
        this.COLLAPSED = collapsed;
      } catch (error) {
        console.warn(error);
      }
    },
    setRouters(routers: Array<I_ROUTER>) {
      try {
        this.ROUTERS = routers;
      } catch (error) {
        console.warn(error);
      }
    },
    addRouterTab(tab: I_ROUTER_TAB) {},
    deleteRouterTab(tab: I_ROUTER_TAB) {},
    changeRouterTab(tab: I_ROUTER_TAB) {},
  },
  persist: { storage: sessionStorage },
});

// collapsed
