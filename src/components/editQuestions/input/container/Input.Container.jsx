import React from 'react';

import styles from './Input.Container.module.css';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function InputContainer({ children, size }) {
  if (React.Children.count(children) === 0) throw new Error('children 값을 입력하지 않으셨습니다');

  if (typeof size !== 'string' || !['small', 'medium', 'large'].includes(size))
    throw new Error('size는 small, medium, large 중 하나이어야 합니다');

  const containerClass = cx('container', {
    [`container-${size}`]: size,
  });
  return <div className={containerClass}>{children}</div>;
}
