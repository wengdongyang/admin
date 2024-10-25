<template>
  <section id="app">
    <a-config-provider :getPopupContainer="getPopupContainer" :locale="zh_CN">
      <router-view />
    </a-config-provider>
  </section>
</template>
<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
// apis
// utils
// types
// mixins
// stores
// configs
// components
export default {
  name: 'App',
  computed: {
    zh_CN: () => zh_CN,
  },
  methods: {
    getPopupContainer(el, dialogContext) {
      if (dialogContext) {
        return dialogContext.getDialogWrap();
      } else {
        return document.body;
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
