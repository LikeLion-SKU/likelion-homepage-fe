import styles from './Button.module.css';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function ButtonLayout({ children, onClick, color, size }) {
  const buttonClass = cx('btn', {
    [`btn--${color}`]: color,
    [`btn-${size}`]: size,
  });

  if (typeof onClick !== 'function') throw new Error('onClick의 값은 함수이어야 합니다');

  if (typeof children !== 'object') throw new Error('children 값을 입력하지 않으셨습니다');

  if (typeof color !== 'string' || !['bright', 'dark'].includes(color)) {
    throw new Error('color의 값은 bringt 또는 dark이어야 합니다');
  }

  if (typeof size !== 'string' || !['small', 'medium', 'large'].includes(size))
    throw new Error('size의 값은 small 또는 medium 또는 large이어야 합니다');

  return (
    <button
      className={buttonClass}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}
