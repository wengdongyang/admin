/** @format */
import { get, set } from '@vueuse/core';
import lodash from 'lodash';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
// apis
// hooks
// utils
import type { ILoginFormState, ILoginToken, IUserinfo } from '@src/types/index.d';
// stores
// mixins
// configs
// components
export const useLoginFormState = defineStore(
  'loginFormState',
  () => {
    ////////////////////系统用户////////////////////
    const ADMIN_LOGIN_FORM_STATE = ref<ILoginFormState>({});
    const ADMIN_IS_REMEMBER_ME = ref<boolean>(false);
    const computedAdminLoginFormState = computed(() => get(ADMIN_LOGIN_FORM_STATE));
    const computedAdminIsRememberMe = computed(() => get(ADMIN_IS_REMEMBER_ME));
    const setAdminLoginFormState = (loginFormState: ILoginFormState) => {
      try {
        set(ADMIN_LOGIN_FORM_STATE, lodash.cloneDeep(loginFormState));
      } catch (error) {
        console.warn(error);
      }
    };
    const setAdminIsRememberMe = (isRememberMe: boolean) => {
      try {
        set(ADMIN_IS_REMEMBER_ME, lodash.cloneDeep(isRememberMe));
      } catch (error) {
        console.warn(error);
      }
    };
    ////////////////////租户////////////////////
    const TENANT_FORM_STATE = ref<ILoginFormState>({});
    const TENANT_IS_REMEMBER_ME = ref<boolean>(false);
    const computedTenantLoginFormState = computed(() => get(TENANT_FORM_STATE));
    const computedTenantIsRememberMe = computed(() => get(TENANT_IS_REMEMBER_ME));
    const setTenantLoginFormState = (loginFormState: ILoginFormState) => {
      try {
        set(TENANT_FORM_STATE, lodash.cloneDeep(loginFormState));
      } catch (error) {
        console.warn(error);
      }
    };
    const setTenantIsRememberMe = (isRememberMe: boolean) => {
      try {
        set(TENANT_IS_REMEMBER_ME, lodash.cloneDeep(isRememberMe));
      } catch (error) {
        console.warn(error);
      }
    };
    ////////////////////租户-子用户////////////////////
    const SON_TENANT_FORM_STATE = ref<ILoginFormState>({});
    const SON_TENANT_IS_REMEMBER_ME = ref<boolean>(false);
    const computedSonTenantLoginFormState = computed(() => get(SON_TENANT_FORM_STATE));
    const computedSonTenantIsRememberMe = computed(() => get(SON_TENANT_IS_REMEMBER_ME));
    const setSonTenantLoginFormState = (loginFormState: ILoginFormState) => {
      try {
        set(SON_TENANT_FORM_STATE, lodash.cloneDeep(loginFormState));
      } catch (error) {
        console.warn(error);
      }
    };

    const setSonTenantIsRememberMe = (isRememberMe: boolean) => {
      try {
        set(SON_TENANT_IS_REMEMBER_ME, lodash.cloneDeep(isRememberMe));
      } catch (error) {
        console.warn(error);
      }
    };

    return {
      ADMIN_LOGIN_FORM_STATE,
      ADMIN_IS_REMEMBER_ME,
      computedAdminLoginFormState,
      computedAdminIsRememberMe,
      setAdminLoginFormState,
      setAdminIsRememberMe,

      TENANT_FORM_STATE,
      TENANT_IS_REMEMBER_ME,
      computedTenantLoginFormState,
      computedTenantIsRememberMe,
      setTenantLoginFormState,
      setTenantIsRememberMe,

      SON_TENANT_FORM_STATE,
      SON_TENANT_IS_REMEMBER_ME,
      computedSonTenantLoginFormState,
      computedSonTenantIsRememberMe,
      setSonTenantLoginFormState,
      setSonTenantIsRememberMe,
    };
  },
  { persist: { storage: localStorage } },
);

export const useUserAuth = defineStore(
  'userAuth',
  () => {
    const LOGIN_TOKEN = ref<ILoginToken>({});
    const USERINFO = ref<IUserinfo>({});
    const ROLES = ref<string[]>([]);
    const PERMISSIONS = ref<string[]>([]);

    const computedToken = computed(() => get(LOGIN_TOKEN, 'token') || '');
    const computedMgToken = computed(() => get(LOGIN_TOKEN, 'mgToken') || '');

    const computedRoles = computed(() => get(ROLES));
    const computedUserinfo = computed(() => get(USERINFO));
    const computedPermissions = computed(() => get(PERMISSIONS));

    const setLoginToken = (loginTokenInfo: ILoginToken) => {
      try {
        set(LOGIN_TOKEN, lodash.cloneDeep(loginTokenInfo));
      } catch (error) {
        console.warn(error);
      }
    };

    const setUserInfoRolesPermissionsRoles = ({
      roles,
      userinfo,
      permissions,
    }: {
      roles: string[];
      userinfo: IUserinfo;
      permissions: string[];
    }) => {
      try {
        set(ROLES, lodash.cloneDeep(roles));
        set(USERINFO, lodash.cloneDeep(userinfo));
        set(PERMISSIONS, lodash.cloneDeep(permissions));
      } catch (error) {
        console.warn(error);
      }
    };

    return {
      LOGIN_TOKEN,
      USERINFO,
      ROLES,
      PERMISSIONS,
      computedToken,
      computedMgToken,
      computedRoles,
      computedUserinfo,
      computedPermissions,
      setLoginToken,
      setUserInfoRolesPermissionsRoles,
    };
  },
  { persist: { storage: sessionStorage, paths: ['LOGIN_TOKEN', 'USERINFO', 'ROLES', 'PERMISSIONS'] } },
);
