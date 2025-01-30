import { useQuestions } from '@/components/creatingQuestions/provider/QuestionsProvider';
import styles from './YearInput.module.css';

export default function YearInput() {
  const { setSemester } = useQuestions();

  return (
    <h1 className={styles['year-input-heading']}>
      멋사{' '}
      <input
        className={styles['year-input-input']}
        type='number'
        min={0}
        onChange={function (e) {
          setSemester(e.target.value);
        }}
      />
      기 지원서
    </h1>
  );
}
