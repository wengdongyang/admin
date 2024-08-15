<!-- @format -->

<template>
  <img :class="$style['captcha-image']" :src="captchaImage" @click="getCaptchaImage" />
</template>
<script lang="ts">
import { message } from 'ant-design-vue';
import { Component, Vue } from 'vue-property-decorator';
// apis
import { apiGetCaptchaImage } from '@src/apis';
// utils
// types
// mixins
// stores
// configs
// components
@Component({ components: {} })
export default class CaptchaImage extends Vue {
  captchaImage = '';

  async getCaptchaImage() {
    const { code, captchaEnabled, img, uuid, msg } = await apiGetCaptchaImage();

    if (code === 200) {
      if (captchaEnabled === true) {
        this.captchaImage = `data:image/gif;base64,${img}`;
        this.$emit('update:uuid', uuid);
      } else {
        this.$emit('captchaDisabled');
      }
    } else {
      message.error(msg);
    }
  }

  mounted() {
    this.$nextTick(async () => {
      await this.getCaptchaImage();
    });
  }
}
</script>
<style lang="scss" module>
.captcha-image {
  object-fit: cover;
}
</style>
