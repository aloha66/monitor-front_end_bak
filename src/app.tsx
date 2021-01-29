import React from 'react';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';

interface MenuDataItem {}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  return {
    navTheme: 'light',
    headerTheme: 'light',
    title: '监控系统',
  };
};

// export async function getInitialState(): Promise<{
//   settings?: LayoutSettings;
//   menuData: MenuDataItem[];
// }> {
//   // 如果是登录页面，不执行
//   // if (history.location.pathname !== '/user/login') {
//   //   const currentUser = await queryMenuData();
//   //   return {
//   //     menuData,
//   //     settings: defaultSettings,
//   //   };
//   // }
//   return {
//     menuData: [],

//     // settings: defaultSettings,
//   };
// }
