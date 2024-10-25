<template>
  <a-layout :class="$style['layout']">
    <a-layout-sider :class="$style['aside']" :collapsed="collapsed" collapsible @collapse="onCollapse">
      <header :class="$style['aside-header']">
        <img :class="$style['logo']" :src="require('./assets/images/logo.png')" />
        <p :class="$style['title']" v-show="!collapsed" :style="{ width: `${title.length}em` }">
          {{ title }}
        </p>
      </header>
      <section :class="$style['aside-content']"></section>
    </a-layout-sider>
    <a-layout :class="$style['content']">
      <a-layout-header :class="$style['content-header']">
        <section></section>
        <a-dropdown placement="bottomRight" arrow>
          <a class="ant-dropdown-link" @click.prevent>
            {{ userInfo.userName || userInfo.nickName }}
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1">个人中心</a-menu-item>
              <a-menu-item key="3">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content :class="$style['content-content']">
        <header :class="$style['content-content-header']">
          <a-tabs type="editable-card" size="small" hideAdd>
            <a-tab-pane tab="系统用户" key="system"> </a-tab-pane>
            <a-tab-pane tab="租户" key="tenant"> </a-tab-pane>
          </a-tabs>
        </header>
        <section :class="$style['content-content-content']">
          <router-view />
        </section>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { message } from 'ant-design-vue';
import { Component, Vue } from 'vue-property-decorator';
// apis
import { apiGetGetRouters } from '@src/apis';
// utils
// types
// mixins
// stores
import { useUserInfo, useSystem } from '@src/store';
// configs
// components
@Component({ components: {} })
export default class LayoutSystem extends Vue {
  get title() {
    return process.env.VUE_APP_TITLE;
  }
  get collapsed() {
    const { collapsed } = useSystem();
    return collapsed;
  }
  get userInfo() {
    const { userInfo } = useUserInfo();
    return userInfo;
  }

  onCollapse(collapsed: boolean) {
    try {
      const { setCollapsed } = useSystem();
      setCollapsed(collapsed);
    } catch (error) {
      console.warn(error);
    }
  }
  checkIsLogin() {
    try {
      const { isLogin } = useUserInfo();
      if (!isLogin) {
        this.$router.push({ path: '/' });
      }
    } catch (error) {
      console.warn(error);
    }
  }

  async getRouters() {
    try {
      const { setRouters } = useSystem();
      const { code, data, msg } = await apiGetGetRouters();
      if (code === 200) {
        setRouters(data);
      } else {
        message.error(msg);
      }
    } catch (error) {
      console.warn(error);
    }
  }
  created() {
    this.checkIsLogin();
  }
  mounted() {
    this.$nextTick(() => {
      this.getRouters();
    });
  }
}
</script>
<style lang="scss" module>
@import './LayoutSystem.scss';
</style>
