/** @format */
import { createRouter, createWebHashHistory } from 'vue-router';
// apis
// hooks
// utils
// stores
// mixins
// configs
import { ENV } from '@src/configs/index.ts';
// components
import LayoutLogin from '@src/layouts/login/LayoutLogin.vue';
import LayoutSystem from '@src/layouts/system/LayoutSystem.vue';

// [
//   {
//     path: '/',
//     hidden: false,
//     component: 'Layout',
//     children: [
//       {
//         name: '/applicationTenant',
//         path: '/applicationTenant',
//         hidden: false,
//         component: 'applicationTenant/index',
//         meta: {
//           title: '应用后台',
//           icon: 'tree',
//           noCache: false,
//         },
//       },
//     ],
//   },
//   {
//     name: 'SlagCar',
//     path: '/slagCar',
//     hidden: false,
//     redirect: 'noRedirect',
//     component: 'Layout',
//     alwaysShow: true,
//     meta: {
//       title: '渣土车',
//       icon: 'checkbox',
//       noCache: false,
//     },
//     children: [
//       {
//         name: '/event',
//         path: '/event',
//         hidden: false,
//         component: 'slagCar/event/index',
//         meta: {
//           title: '事件管理',
//           icon: 'list',
//           noCache: false,
//         },
//       },
//       {
//         name: '/inspection',
//         path: '/inspection',
//         hidden: false,
//         component: 'slagCar/inspection/index',
//         meta: {
//           title: '巡查记录',
//           icon: 'drag',
//           noCache: false,
//         },
//       },
//       {
//         name: '/task',
//         path: '/task',
//         hidden: false,
//         component: 'slagCar/task/index',
//         meta: {
//           title: '任务管理',
//           icon: 'date',
//           noCache: false,
//         },
//       },
//       {
//         name: '/alarm',
//         path: '/alarm',
//         hidden: false,
//         component: 'slagCar/alarm/index',
//         meta: {
//           title: '预警管理',
//           icon: 'question',
//           noCache: false,
//         },
//       },
//       {
//         name: '/slagCar/statistics',
//         path: '/slagCar/statistics',
//         hidden: false,
//         component: 'slagCar/statistics/index',
//         meta: {
//           title: '数据统计',
//           icon: 'monitor',
//           noCache: false,
//         },
//       },
//     ],
//   },
//   {
//     name: 'System',
//     path: '/system',
//     hidden: false,
//     redirect: 'noRedirect',
//     component: 'Layout',
//     alwaysShow: true,
//     meta: {
//       title: '系统管理',
//       icon: 'system',
//       noCache: false,
//     },
//     children: [
//       {
//         name: 'OrgPeoples',
//         path: 'orgPeoples',
//         hidden: false,
//         component: 'system/orgPeoples/index',
//         meta: {
//           title: '公众端街道用户管理',
//           icon: 'wechat',
//           noCache: false,
//         },
//       },
//       {
//         name: 'SonTenantRoleManagement',
//         path: 'sonTenantRoleManagement',
//         hidden: false,
//         component: 'system/sonTenantRoleManagement/index',
//         meta: {
//           title: '街道子账户角色管理',
//           icon: 'button',
//           noCache: false,
//         },
//       },
//       {
//         name: 'SonTenantAccountManagement',
//         path: 'sonTenantAccountManagement',
//         hidden: false,
//         component: 'system/sonTenantAccountManagement/index',
//         meta: {
//           title: '街道子账户账号管理',
//           icon: 'checkbox',
//           noCache: false,
//         },
//       },
//     ],
//   },
// ];

const router = createRouter({
  history: createWebHashHistory(ENV.BASE_URL),
  routes: [
    { path: '/', name: '', redirect: '/login' },
    { path: '/login', name: 'adminLogin', component: LayoutLogin },
    { path: '/system', name: 'system', component: LayoutSystem },
  ],
});

export default router;
