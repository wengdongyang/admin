<!-- @format -->
<template>
  <a-form class="form" layout="vertical" :model="formState" @finish="onFinish" size="large">
    <a-form-item class="form-item" name="username" :rules="[{ required: true, message: '请输入系统用户账号' }]">
      <a-input class="input" v-model:value="formState.username" placeholder="系统用户账号" type="text">
        <template #prefix>
          <i class="fa fa-user" aria-hidden="true" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item class="form-item" name="password" :rules="[{ required: true, message: '请输入密码' }]">
      <a-input-password class="input" v-model:value="formState.password" placeholder="密码" type="password">
        <template #prefix>
          <i class="fa fa-lock" aria-hidden="true" />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item class="form-item" name="code" :rules="[{ required: true, message: '请输入验证码' }]">
      <a-row :gutter="12">
        <a-col :span="18">
          <a-input class="input-code" v-model:value="formState.code" placeholder="验证码">
            <template #prefix>
              <i class="fa fa-check-circle" aria-hidden="true" />
            </template>
          </a-input>
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
import { apiGetGetInfo, apiPostLoginPlatform } from '@src/apis';
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
const { computedAdminLoginFormState, computedAdminIsRememberMe } = storeToRefs(storeLoginFormState);

const captchaImageRef = ref();

const formState = ref({ username: null, password: null, code: null, uuid: null });

const isRememberMe = ref(false);

const initFormState = () => {
  try {
    const storeIsRememberMe = get(computedAdminIsRememberMe);
    const storeLoginFormState = get(computedAdminLoginFormState);
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
      storeUserAuth.setUserInfoRolesPermissionsRoles(res);
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
    const res = await apiPostLoginPlatform(values);
    const innerIsRememberMe = get(isRememberMe);

    const { code, msg } = res;
    if (code === 200) {
      storeUserAuth.setLoginToken(res);

      sessionStorage.setItem(ENV.TOKEN_KEY, res.token);
      sessionStorage.setItem(ENV.MG_TOKEN_KEY, res.mgToken);

      storeLoginFormState.setAdminLoginFormState(innerIsRememberMe ? values : {});
      storeLoginFormState.setAdminIsRememberMe(innerIsRememberMe);

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
