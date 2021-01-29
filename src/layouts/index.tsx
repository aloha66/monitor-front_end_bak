import React from 'react';
import { UseRequestProvider } from 'ahooks';
import request from '../utils/request';

function BasicLayout(props) {
  return (
    <UseRequestProvider
      value={{
        requestMethod: (param: any) => request(param),
      }}
    >
      {props.children}
    </UseRequestProvider>
  );
}

export default BasicLayout;
