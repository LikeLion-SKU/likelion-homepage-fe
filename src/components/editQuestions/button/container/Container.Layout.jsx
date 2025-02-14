import React from 'react';

import styles from './Container.module.css';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function ContainerLayout({ children, size, loading }) {
  if (React.Children.count(children) === 0) throw new Error('children 값을 입력하지 않으셨습니다');

  if (typeof size !== 'string' || !['small', 'medium', 'large', 'superLarge'].includes(size))
    throw new Error('size는 small, medium, large, superLarge 중 하나이어야 합니다');

  const containerClass = cx('container', {
    [`container-${size}`]: size,
    'container-loading': loading,
  });

  return <div className={containerClass}>{children}</div>;
}
