/** @format */
import 'minireset.css/minireset.css';

import 'ant-design-vue/dist/antd.css';
import 'font-awesome/css/font-awesome.css';
import 'nprogress/nprogress.css';

import Antd from 'ant-design-vue';
import { PiniaVuePlugin, createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Vue from 'vue';

import App from './App.vue';
import router from './router';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

Vue.config.productionTip = false;

Vue.use(Antd).use(PiniaVuePlugin);

new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount('#app');
