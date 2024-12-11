import React from 'react';
import styles from './sectionwrapper.module.css';

function SectionWrapper({ children }) {
  return (
    <div className={styles.section}>
      {children}
    </div>
  );
}

export default SectionWrapper;
