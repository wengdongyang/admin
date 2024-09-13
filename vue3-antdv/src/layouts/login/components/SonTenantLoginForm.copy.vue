<!-- @format -->
<template>
  <a-form class="form" layout="vertical" :model="formState" @finish="onFinish" size="large">
    <a-form-item class="form-item" label="租户子用户账号" name="username" :rules="[{ required: true }]">
      <a-input class="input" v-model:value="formState.username" placeholder="租户子用户账号" type="text" />
    </a-form-item>
    <a-form-item class="form-item" label="密码" name="password" :rules="[{ required: true }]">
      <a-input class="input" v-model:value="formState.password" placeholder="密码" type="password" />
    </a-form-item>
    <a-form-item class="form-item" label="验证码" name="code" :rules="[{ required: true }]">
      <a-row :gutter="12">
        <a-col :span="18">
          <a-input class="input-code" v-model:value="formState.code" placeholder="验证码" />
        </a-col>
        <a-col :span="6">
          <CaptchaImage class="captcha-image" :ref="(ref) => (captchaImageRef = ref)" v-model:uuid="formState.uuid"
            @updateCaptchaImage="onUpdateCaptchaImage" />
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item class="form-item">
      <a-checkbox class="remember-me" v-model:checked="isRememberMe">记住密码</a-checkbox>
    </a-form-item>
    <a-form-item class="form-item">
      <a-button class="login-btn" type="primary" block html-type="submit"> 登 录 </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="jsx" setup>
import { get, set, tryOnMounted } from '@vueuse/core';
import { message } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// apis
import { apiGetGetInfo, apiPostLoginSonTenant } from '@src/apis';
// hooks
// utils
// stores
import { useLoginFormState, useUserAuth } from '@src/stores';
// configs
import { ENV } from '@src/configs';
// components
import CaptchaImage from './CaptchaImage.vue';

const { push } = useRouter();
const storeUserAuth = useUserAuth();
const storeLoginFormState = useLoginFormState();
const { computedSonTenantLoginFormState, computedSonTenantIsRememberMe } = storeToRefs(storeLoginFormState);

const captchaImageRef = ref();

const formState = ref({ username: null, password: null, code: null, uuid: null });

const isRememberMe = ref(false);

const initFormState = () => {
  try {
    const storeIsRememberMe = get(computedSonTenantIsRememberMe);
    const storeLoginFormState = get(computedSonTenantLoginFormState);
    if (storeIsRememberMe) {
      set(isRememberMe, storeIsRememberMe);
      set(formState, Object.assign(storeLoginFormState, { code: null, uuid: null }));
    }
  } catch (error) {
    console.warn(error);
  }
};

const getUserInfoPermissionsRoles = async () => {
  try {
    const res = await apiGetGetInfo();
    const { code, msg } = res;
    if (code === 200) {
      storeUserAuth.setUserInfoPermissionsRoles(res);
      push({ path: '/index' });
    } else {
      message.error(msg);
    }
  } catch (error) {
    console.warn(error);
  }
};

const onUpdateCaptchaImage = () => {
  try {
    set(formState, Object.assign({}, get(formState), { code: null }));
  } catch (error) {
    console.warn(error);
  }
};

const onFinish = async () => {
  try {
    const values = get(formState);
    const res = await apiPostLoginSonTenant(values);
    const innerIsRememberMe = get(isRememberMe);

    const { code, msg } = res;
    if (code === 200) {
      storeUserAuth.setLoginToken(res);

      sessionStorage.setItem(ENV.TOKEN_KEY, res.token);
      sessionStorage.setItem(ENV.MG_TOKEN_KEY, res.mgToken);

      storeLoginFormState.setSonTenantLoginFormState(innerIsRememberMe ? values : {});
      storeLoginFormState.setSonTenantIsRememberMe(innerIsRememberMe);

      getUserInfoPermissionsRoles();
    } else {
      message.error(msg);
      captchaImageRef.value?.resetCaptchaImage();
    }
  } catch (error) {
    console.warn(error);
  }
};
tryOnMounted(() => {
  initFormState();
});
</script>
<style lang="less" scoped>
@import './LoginForm.less';
</style>
