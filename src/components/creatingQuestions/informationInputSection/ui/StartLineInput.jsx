import { useQuestions } from '@/components/creatingQuestions/provider/QuestionsProvider';
import styles from './DeadLineInput.module.css';

export default function StartLineInput() {
  const { setStartLine } = useQuestions();

  return (
    <>
      <label
        className={styles['dead-line-label']}
        htmlFor='dead-line-input'
      >
        공개일 날짜
      </label>
      <input
        className={styles['dead-line-input']}
        type='datetime-local'
        id='dead-line-input'
        onChange={function (e) {
          setStartLine(e.target.value);
        }}
      />
    </>
  );
}
