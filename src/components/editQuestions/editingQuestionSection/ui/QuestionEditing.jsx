import styles from './QuestionEditing.module.css';
import ButtonsContainer from '@/components/editQuestions/editingQuestionSection/ButtonsContainer';

export default function QuestionEditing({ content }) {
  return (
    <div className={styles['question-editing-container']}>
      <input
        className={styles['question-input']}
        value={content}
      />
      <ButtonsContainer />
    </div>
  );
}
