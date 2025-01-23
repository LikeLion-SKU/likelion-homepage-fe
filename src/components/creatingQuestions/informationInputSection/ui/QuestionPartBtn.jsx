import classNames from 'classnames/bind';

import styles from './QuestionPartBtn.module.css';

const cn = classNames.bind(styles);

export default function QuestionPartBtn({ part, onClick, isActive }) {
  return (
    <button
      className={cn('question-type-btn', {
        'question-type-btn--clicked': isActive,
      })}
      onClick={function () {
        onClick(part);
      }}
    >
      {part}
    </button>
  );
}
