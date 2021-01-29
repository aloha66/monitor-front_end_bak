import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/login', component: 'login', layout: false },
    { exact: true, path: '/', redirect: '/monitor/dashboard' },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/monitor/dashboard',
          component: '@/pages/monitor/dashboard',
        },
        {
          path: '/monitor/analysis',
          component: '@/pages/monitor/analysis',
        },
        {
          path: '/config/system',
          component: '@/pages/config/system',
        },
        {
          path: '/dict',
          component: '@/pages/dict',
        },
      ],
    },
  ],
});
