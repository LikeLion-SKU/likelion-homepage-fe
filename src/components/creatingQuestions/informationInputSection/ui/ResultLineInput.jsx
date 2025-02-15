import { useQuestions } from '@/components/creatingQuestions/provider/QuestionsProvider';
import styles from './DeadLineInput.module.css';

export default function ResultLineInput() {
  const { setResultLine } = useQuestions();

  return (
    <>
      <label
        className={styles['dead-line-label']}
        htmlFor='dead-line-input'
      >
        발표일 날짜
      </label>
      <input
        className={styles['dead-line-input']}
        type='datetime-local'
        id='dead-line-input'
        onChange={function (e) {
          setResultLine(e.target.value);
        }}
      />
    </>
  );
}
