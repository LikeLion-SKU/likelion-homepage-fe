import classNames from 'classnames/bind';

import styles from './QuestionPartBtn.module.css';

import { convertQuestionPartToString } from '@/utils/questionParts';

const cn = classNames.bind(styles);

export default function QuestionPartBtn({ part, onClick, isActive, setSelectedPart }) {
  return (
    <button
      className={cn('question-type-btn', {
        'question-type-btn--clicked': isActive,
      })}
      onClick={function () {
        onClick(part);
        setSelectedPart(part);
      }}
    >
      {convertQuestionPartToString(part)}
    </button>
  );
}
