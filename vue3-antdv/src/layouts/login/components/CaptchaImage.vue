<!-- @format -->

<template>
  <img :class="$style['captcha-image']" :src="captchaImage" @click="getCaptchaImage" />
</template>
<script lang="jsx" setup>
import { ref, computed } from 'vue';
import { message } from 'ant-design-vue';
import { get, set, tryOnMounted } from '@vueuse/core';
// apis
import { apiGetCaptchaImage } from '@src/apis';

// hooks

// stores
// configs
// components

defineProps({
  uuid: { type: [String, Number] },
});
const emits = defineEmits(['update:uuid', 'updateCaptchaImage']);

const captchaUrl = ref();

const captchaImage = computed(() => {
  try {
    const url = get(captchaUrl);
    if (url) {
      return `data:image/gif;base64,${url}`;
    }
    return '';
  } catch (error) {
    console.warn(error);
    return '';
  }
});

const getCaptchaImage = async () => {
  try {
    const { code, img, uuid, msg } = await apiGetCaptchaImage();
    if (code === 200 && img && uuid) {
      set(captchaUrl, img);
      emits('update:uuid', uuid);
      emits('updateCaptchaImage');
    } else {
      message.error(msg);
    }
  } catch (error) {
    console.warn(error);
  }
};
tryOnMounted(() => {
  getCaptchaImage();
});

defineExpose({
  resetCaptchaImage: getCaptchaImage,
});
</script>
<style lang="less" module>
.captcha-image {
  object-fit: cover;
}
</style>
