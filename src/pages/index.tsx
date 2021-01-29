import React, { useEffect } from 'react';
import styles from './index.less';

import { useRequest } from 'ahooks';

export default () => {
  useEffect(() => {}, []);

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
};
