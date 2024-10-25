<template>
  <section class="login-layout">
    <section class="login-content">
      <section class="login-form-layout">
        <header class="login-form-header">欢迎登录</header>
        <a-tabs>
          <a-tab-pane tab="系统用户" key="system">
            <AdminLogin />
          </a-tab-pane>
          <a-tab-pane tab="租户" key="tenant">
            <TenantLogin />
          </a-tab-pane>
        </a-tabs>
      </section>
    </section>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// apis
// utils
// types
// mixins
// stores
// configs
// components
import AdminLogin from './components/AdminLogin.vue';
import TenantLogin from './components/TenantLogin.vue';
@Component({ components: { AdminLogin, TenantLogin } })
export default class LayoutLogin extends Vue {}
</script>
<style lang="scss" scoped>
@import './LayoutLogin.scss';
</style>
