/** @format */
import NProgress from 'nprogress';
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

// const remoteRouters = [
//   { name: '/workbench', path: '/workbench', component: 'workbench/index', meta: { title: '工作台', icon: 'redis' } },
//   {
//     name: '/applicationTenant',
//     path: '/applicationTenant',
//     component: 'applicationTenant/index',
//     meta: { title: '应用后台', icon: 'tree' },
//   },
//   { name: '/banner', path: '/banner', component: 'banner/index', meta: { title: 'Banner配置', icon: 'tab' } },
//   { name: '/news', path: '/news', component: 'news/index', meta: { title: '快讯中心', icon: 'documentation' } },
//   { name: '/message', path: '/message', component: 'message/index', meta: { title: '消息中心', icon: 'message' } },
//   { name: '/announcement', path: '/announcement', component: 'announcement/index', meta: { title: '公告中心', icon: 'message' } },
//   {
//     name: '/applicationManage',
//     path: '/applicationManage',
//     component: 'applicationManage/index',
//     meta: { title: '应用中心', icon: 'table' },
//   },
//   { name: '/event', path: '/event', component: 'slagCar/event/index', meta: { title: '事件管理', icon: 'list' } },
//   { name: '/inspection', path: '/inspection', component: 'slagCar/inspection/index', meta: { title: '巡查记录', icon: 'drag' } },
//   { name: '/task', path: '/task', component: 'slagCar/task/index', meta: { title: '任务管理', icon: 'date' } },
//   { name: '/alarm', path: '/alarm', component: 'slagCar/alarm/index', meta: { title: '预警管理', icon: 'question' } },
//   {
//     name: '/slagCar/statistics',
//     path: '/slagCar/statistics',
//     component: 'slagCar/statistics/index',
//     meta: { title: '数据统计', icon: 'monitor' },
//   },
//   { name: 'PublicDisclosure', path: 'publicDisclosure', component: 'slagCar/event/index', meta: { title: '事件管理', icon: 'component' } },
//   {
//     name: 'LampblackCode/supervisionObjectManagementList',
//     path: 'lampblackCode/supervisionObjectManagementList',
//     component: 'lampblackCode/supervisionObjectManagementList/index',
//     meta: { title: '监管对象', icon: 'build' },
//   },
//   {
//     name: 'LampblackCode/inspectionRecordList',
//     path: 'lampblackCode/inspectionRecordList',
//     component: 'lampblackCode/inspectionRecordList/index',
//     meta: { title: '检查记录', icon: 'date' },
//   },
//   {
//     name: 'LampblackCode/cleaningRecordList',
//     path: 'lampblackCode/cleaningRecordList',
//     component: 'lampblackCode/cleaningRecordList/index',
//     meta: { title: '清洗记录', icon: '#' },
//   },
//   { name: 'Tenant', path: 'tenant', component: 'system/tenant/index', meta: { title: '租户管理', icon: 'peoples' } },
//   { name: 'User', path: 'user', component: 'system/user/index', meta: { title: '用户管理', icon: 'user' } },
//   { name: 'Peoples', path: 'peoples', component: 'system/peoples/index', meta: { title: '公众端用户管理', icon: 'wechat' } },
//   { name: 'OrgPeoples', path: 'orgPeoples', component: 'system/orgPeoples/index', meta: { title: '公众端街道用户管理', icon: 'wechat' } },
//   { name: 'Role', path: 'role', component: 'system/role/index', meta: { title: '角色管理', icon: 'peoples' } },
//   { name: 'Menu', path: 'menu', component: 'system/menu/index', meta: { title: '菜单管理', icon: 'tree-table' } },
//   { name: 'Dept', path: 'dept', component: 'system/dept/index', meta: { title: '部门管理', icon: 'tree' } },
//   { name: 'Post', path: 'post', component: 'system/post/index', meta: { title: '岗位管理', icon: 'post' } },
//   { name: 'Dict', path: 'dict', component: 'system/dict/index', meta: { title: '字典管理', icon: 'dict' } },
//   { name: 'Config', path: 'config', component: 'system/config/index', meta: { title: '参数设置', icon: 'edit' } },
//   { name: 'Notice', path: 'notice', component: 'system/notice/index', meta: { title: '通知公告', icon: 'message' } },
//   { name: 'Log', path: 'log', component: 'ParentView', meta: { title: '日志管理', icon: 'log' } },
//   {
//     name: 'SonTenantRoleManagement',
//     path: 'sonTenantRoleManagement',
//     component: 'system/sonTenantRoleManagement/index',
//     meta: { title: '街道子账户角色管理', icon: 'button' },
//   },
//   {
//     name: 'SonTenantAccountManagement',
//     path: 'sonTenantAccountManagement',
//     component: 'system/sonTenantAccountManagement/index',
//     meta: { title: '街道子账户账号管理', icon: 'checkbox' },
//   },
//   { name: 'Online', path: 'online', component: 'monitor/online/index', meta: { title: '在线用户', icon: 'online' } },
//   { name: 'Job', path: 'job', component: 'monitor/job/index', meta: { title: '定时任务', icon: 'job' } },
//   { name: 'Druid', path: 'druid', component: 'monitor/druid/index', meta: { title: '数据监控', icon: 'druid' } },
//   { name: 'Server', path: 'server', component: 'monitor/server/index', meta: { title: '服务监控', icon: 'server' } },
//   { name: 'Cache', path: 'cache', component: 'monitor/cache/index', meta: { title: '缓存监控', icon: 'client' } },
//   { name: 'CacheList', path: 'cacheList', component: 'monitor/cache/list', meta: { title: '缓存列表', icon: 'redis-list' } },
//   { name: 'Build', path: 'build', component: 'tool/build/index', meta: { title: '表单构建', icon: 'build' } },
//   { name: 'Gen', path: 'gen', component: 'tool/gen/index', meta: { title: '代码生成', icon: 'code' } },
//   { name: 'Swagger', path: 'swagger', component: 'tool/swagger/index', meta: { title: '系统接口', icon: 'swagger' } },
// ];

const routers = createRouter({
  history: createWebHashHistory(ENV.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LayoutLogin },
    {
      path: '/',
      name: 'System',
      component: LayoutSystem,
      children: [{ path: '/pageIndex', name: 'index', alias: ['/index'], component: () => import('@src/pages/index/index.vue') }],
    },
  ],
});

const WhiteRouterList = ['/login', '/register'];
routers.beforeEach((to, from, next) => {
  NProgress.start();
  if (WhiteRouterList.includes(to.path)) {
    next();
    NProgress.done();
  } else {
    const token = sessionStorage.getItem(ENV.TOKEN_KEY);
    if (token) {
      next();
      NProgress.done();
    } else {
      next({ path: '/login' });
      NProgress.done();
    }
  }
});

export default routers;
