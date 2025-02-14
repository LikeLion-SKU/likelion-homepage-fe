import styles from './Input.module.css';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function Input({ readOnly, type, value, id, onChange, min, size, rounded }) {
  if (typeof type !== 'string') throw new Error('type을 입력하지 않으셨습니다');

  if (typeof readOnly !== 'boolean') throw new Error('readOnly는 true, false 중 하나이어야 합니다');

  if (typeof onChange !== 'function') throw new Error('onChange는 함수이어야 합니다');

  if (typeof size !== 'string' || !['small', 'medium', 'large'].includes(size))
    throw new Error('size는 small, medium, large 중 하나이어야 합니다');

  if (typeof rounded !== 'boolean') throw new Error('rounded는 true, false 중 하나이어야 합니다');

  const inputClass = cx('input', {
    [`input-${size}`]: size,
    'input--rounded': rounded,
  });

  return (
    <input
      className={inputClass}
      readOnly={readOnly}
      type={type}
      value={value}
      id={id}
      min={min}
      onChange={(e) => onChange(e)}
    />
  );
}

export function withLabel(Component) {
  return function ({ children, id, ...props }) {
    <label htmlFor={id}>{children}</label>;
    <Component
      id={id}
      {...props}
    />;
  };
}
