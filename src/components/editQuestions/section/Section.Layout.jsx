import React from 'react';

import styles from './Section.module.css';

export default function SectionLayout({ children }) {
  if (React.Children.count(children) === 0) throw new Error('children 값을 입력하지 않으셨습니다');

  return <section className={styles['section']}>{children}</section>;
}
