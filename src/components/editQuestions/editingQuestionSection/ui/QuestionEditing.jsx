import { useState } from 'react';
import styles from './QuestionEditing.module.css';
import ButtonsContainer from '@/components/editQuestions/editingQuestionSection/ButtonsContainer';
import CompleteBtn from '@/components/editQuestions/editingInformationInputSection/ui/CompleteBtn';

export default function QuestionEditing({ content }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className={styles['question-editing-container']}>
      <input
        className={styles['question-input']}
        value={content}
      />
      {isEditing ? (
        <CompleteBtn />
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
