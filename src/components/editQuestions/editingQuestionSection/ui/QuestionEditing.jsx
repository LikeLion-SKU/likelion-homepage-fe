import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import styles from './QuestionEditing.module.css';
import ButtonsContainer from '@/components/editQuestions/editingQuestionSection/ButtonsContainer';
import CompleteBtn from '@/components/editQuestions/editingQuestionSection/ui/CompleteBtn';
import { useUpdateQuestionByType } from '@/hooks/useApplication';

export default function QuestionEditing({ content, questionId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedQuestion, setUpdatedQuestion] = useState(content);
  const location = useLocation();
  const [searchParam] = useSearchParams();
  const { updateQuestionByType } = useUpdateQuestionByType(
    questionId,
    {
      id: questionId,
      type: searchParam.get('type'),
      content: updatedQuestion,
    },
    location.pathname.split('/')[4],
    searchParam.get('type'),
  );
  return (
    <div className={styles['question-editing-container']}>
      {isEditing ? (
        <input
          className={styles['question-input']}
          value={updatedQuestion}
          onChange={function (e) {
            setUpdatedQuestion(e.target.value);
          }}
        />
      ) : (
        <input
          className={styles['question-input']}
          value={content}
          readOnly={true}
        />
      )}
      {isEditing ? (
        <CompleteBtn
          onClick={function () {
            updateQuestionByType();
          }}
        />
      ) : (
        <ButtonsContainer
          setIsEditing={function () {
            setIsEditing((prev) => !prev);
          }}
        />
      )}
    </div>
  );
}
