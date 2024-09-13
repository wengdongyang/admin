<!-- @format -->
<template>
  <a-layout :class="$style['system-layout']" hasSider>
    <a-layout-sider :class="$style['system-layout-aside']" v-model:collapsed="collapsed" collapsible>
      <section :class="$style['aside-layout']">
        <header :class="$style['aside-header']">
          <img :class="$style['logo']" :src="ImageLogo" />
          <p :class="$style['title']" v-show="!collapsed">
            小镇在线管理系统
          </p>
        </header>
        <section :class="$style['aside-content']">
          <a-menu :class="$style['menu']" :selectedKeys="selectedKeys" theme="dark">
            <a-menu-item key="1">
              <span>nav 1</span>
            </a-menu-item>
          </a-menu>
        </section>
      </section>
    </a-layout-sider>
    <a-layout :class="$style['system-layout-layout']">
      <a-layout-header :class="$style['system-layout-layout-header']">
        <section :class="$style['header-layout']">
          <section :class="$style['header-content']">
            <a-breadcrumb>
              <a-breadcrumb-item>User</a-breadcrumb-item>
              <a-breadcrumb-item>Bill</a-breadcrumb-item>
            </a-breadcrumb>
          </section>
          <aside :class="$style['header-aside']">666</aside>
        </section>
      </a-layout-header>
      <a-layout-content :class="$style['system-layout-layout-content']">
        <section :class="$style['main-layout']">
          <header :class="$style['main-header']">
            <a-tabs hide-add>
              <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable" />
            </a-tabs>
          </header>
          <section :class="$style['main-content']"></section>
        </section>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="jsx" setup>
import { ref } from 'vue';
// apis
// hooks
// utils
// stores
// configs
// components
import ImageLogo from './assets/images/logo.png';

const collapsed = ref(false);


const selectedKeys = ref(['1']);

const panes = ref([
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false },
]);
</script>
<style lang="less" module>
@import './LayoutSystem.module.less';
</style>
