<!-- @format -->
<template>
  <a-form-model :class="$style['form']" ref="formRef" :model="formModel" :rules="formRules">
    <a-form-model-item :class="$style['form-item']" label="用户账号" prop="username">
      <a-input
        :class="[$style['input'], $style['username']]"
        v-model="formModel.username"
        placeholder="用户账号"
        autocomplete="off"
        size="large"
        allowClear
      />
    </a-form-model-item>
    <a-form-model-item :class="$style['form-item']" label="密码" prop="password">
      <a-input-password
        :class="[$style['input'], $style['password']]"
        v-model="formModel.password"
        placeholder="密码"
        autocomplete="off"
        size="large"
        allowClear
      />
    </a-form-model-item>
    <template v-if="captchaVisible">
      <a-form-model-item :class="$style['form-item']" label="验证码" prop="code">
        <a-row :gutter="12">
          <a-col :span="17">
            <a-input
              :class="[$style['input'], $style['code']]"
              v-model="formModel.code"
              placeholder="验证码"
              autocomplete="off"
              size="large"
              allowClear
            />
          </a-col>
          <a-col :span="7">
            <CaptchaImage
              :class="$style['captcha-image']"
              ref="captchaImageRef"
              :uuid.sync="formModel.uuid"
              @update:uuid="onUpdateUuid"
              @captchaDisabled="() => (captchaVisible = false)"
            />
          </a-col>
        </a-row>
      </a-form-model-item>
    </template>
    <a-form-model-item :class="$style['form-item']">
      <a-checkbox class="remember-me" v-model="isRememberMe">记住密码</a-checkbox>
    </a-form-model-item>
    <a-form-model-item :class="$style['form-item']">
      <a-button type="primary" size="large" @click="onClickLogin" block>登录</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script lang="ts">
import { message } from 'ant-design-vue';
import { Component, Vue } from 'vue-property-decorator';
// apis
import { apiPostLoginPlatform } from '@src/apis';
// utils
// types
// mixins
// stores
import { useLoginFormState, useUserInfo } from '@src/store';
// configs
import { ENV } from '@src/configs';
// components
import CaptchaImage from './CaptchaImage.vue';

@Component({ components: { CaptchaImage } })
export default class AdminLogin extends Vue {
  captchaVisible = true;

  isRememberMe = false;

  formModel = { username: null, password: null, code: null, uuid: null };

  get formRules() {
    return {
      username: [{ required: true, message: '必填! - 用户账号' }],
      password: [{ required: true, message: '必填! - 密码' }],
      code: [{ required: true, message: '必填! - 验证码' }],
    };
  }

  onUpdateUuid() {
    try {
      const { formModel } = this;
      this.formModel = Object.assign({}, formModel, { code: null });
    } catch (error) {
      console.warn(error);
    }
  }

  async checkStoreLoginFormState() {
    try {
      const { checkTenantLoginFormState } = useLoginFormState();
      await checkTenantLoginFormState();
    } catch (error) {
      console.warn(error);
    }
  }

  async initFormModel() {
    try {
      const { formModel } = this;
      const { tenantIsRemember, tenantLoginFormState } = useLoginFormState();
      if (tenantIsRemember) {
        this.isRememberMe = tenantIsRemember;
        this.formModel = Object.assign({}, formModel, tenantLoginFormState);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  async onClickLogin() {
    try {
      const { formModel, isRememberMe } = this;
      const { setTenantLoginFormState } = useLoginFormState();
      const { setUserTokens } = useUserInfo();

      const formRef: any = this.$refs['formRef'];
      const captchaImageRef: any = this.$refs['captchaImageRef'];
      const isOk = await formRef?.validate();

      if (isOk) {
        const res = await apiPostLoginPlatform(formModel);
        if (res.code === 200) {
          message.success(res.msg);

          setUserTokens(res);

          sessionStorage.setItem(ENV.TOKEN_KEY, res.token);
          sessionStorage.setItem(ENV.MG_TOKEN_KEY, res.mgToken);

          setTenantLoginFormState(isRememberMe ? formModel : {});

          this.$router.push({ path: '/system' });
        } else {
          message.error(res.msg);
          captchaImageRef.getCaptchaImage();
        }
      }
    } catch (error) {
      console.warn(error);
    }
  }
  created() {
    this.$nextTick(async () => {
      await this.checkStoreLoginFormState();
    });
  }
  mounted() {
    this.$nextTick(async () => {
      await this.initFormModel();
    });
  }
}
</script>
<style lang="scss" module>
.form {
  width: 400px;
  .form-item {
    .captcha-image {
      height: 40px;
      vertical-align: top;
    }
  }
}
</style>
