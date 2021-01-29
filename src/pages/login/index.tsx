import React from 'react';
import { history } from 'umi';

export default () => {
  const click = () => {
    history.push('/monitor/dashboard');
  };
  return (
    <div>
      <h1> login</h1>
      <div onClick={click}>click</div>
    </div>
  );
};
