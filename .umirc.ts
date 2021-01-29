import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    'primary-color': '#2F54EB',
    // "btn-primary-bg": "#2F54EB"
  },
  proxy: {
    '/api': {
      target: ' http://localhost:7300/mock/60094c18d40d275b7cd2efa6/monitor',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  dva: {
    immer: true,
  },
  layout: {
    name: 'Ant Design',
    locale: true,
    layout: 'side',
  },
  devtool: 'source-map',
  antd: {},
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
  alias: {
    '@com': resolve(__dirname, 'src/components/'),
    '@util': resolve(__dirname, 'src/utils/'),
    '@img': resolve(__dirname, 'src/assets/img/'),
    '@page': resolve(__dirname, 'src/page/'),
  },
});
