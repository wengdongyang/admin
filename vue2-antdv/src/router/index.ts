/** @format */
import Vue from 'vue';
import VueRouter from 'vue-router';
// apis
// utils
// types
import type { RouteConfig } from 'vue-router';
// mixins
// stores
// configs
// components
import LayoutLogin from '../layouts/login/LayoutLogin.vue';
import LayoutSystem from '../layouts/system/LayoutSystem.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: '/', name: '', redirect: '/login' },
  { path: '/login', name: 'login', component: LayoutLogin },
  { path: '/system', name: 'system', component: LayoutSystem },
];

const router = new VueRouter({
  routes,
});

export default router;
