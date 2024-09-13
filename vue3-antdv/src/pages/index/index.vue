<!-- @format -->
<template>
  <section>index</section>
</template>
<script lang="tsx" name="index" setup>
import { get, set, tryOnMounted } from '@vueuse/core';
import { message } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
// apis
// hooks
// utils
// stores
// configs
// components
tryOnMounted(async () => { });
watch(
  () => [],
  (newValue) => { },
  { immediate: true, deep: true },
);
</script>
<style lang="less" scoped></style>
