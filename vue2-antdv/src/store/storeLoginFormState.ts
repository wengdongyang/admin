/** @format */
import dayjs from 'dayjs';
import lodash from 'lodash';
import { defineStore } from 'pinia';
// apis
// utils
// types
// mixins
// stores
// configs
// components
type I_LOGIN_FORM_STATE = Partial<{
  username: string | null;
  password: string | null;
}>;

type I_STORE_LOGIN_FORM_STATE = Partial<{
  ADMIN_STORAGE_TIME: string;
  ADMIN_IS_REMEMBER: boolean;
  ADMIN_LOGIN_FORM_STATE: I_LOGIN_FORM_STATE;

  TENANT_STORAGE_TIME: string;
  TENANT_IS_REMEMBER: boolean;
  TENANT_LOGIN_FORM_STATE: I_LOGIN_FORM_STATE;
}>;

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

type I_USER_TOKENS = Partial<{
  mgToken: string;
  token: string;
}>;
type I_STORE_USER_INFO = Partial<{
  USER_TOKENS: I_USER_TOKENS;
}>;

export const useUserInfo = defineStore('userinfo', {
  state: (): I_STORE_USER_INFO => {
    return {
      USER_TOKENS: {}, // userTokens
    };
  },
  getters: {
    token: (state: I_STORE_USER_INFO) => lodash.get(state, ['USER_TOKENS', 'token']) || '',
    mgToken: (state: I_STORE_USER_INFO) => lodash.get(state, ['USER_TOKENS', 'mgToken']) || '',
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
  },
  persist: { storage: sessionStorage },
});

type I_ROUTER = any;
type I_ROUTER_TAB = any;
type I_STORE_SYSTEM = Partial<{
  COLLAPSED: boolean;
  ROUTERS: I_ROUTER[];
  ROUTER_TABS: I_ROUTER_TAB[];
  ACTIVE_ROUTER_TAB: I_ROUTER_TAB;
}>;

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
