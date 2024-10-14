import React from 'react';
import styles from './Wrapper.module.css';

const Wrapper = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>{children}</div>
    </div>
  );
};

export default Wrapper;
