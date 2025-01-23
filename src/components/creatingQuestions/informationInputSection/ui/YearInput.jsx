import styles from './YearInput.module.css';

export default function YearInput() {
  return (
    <h1 className={styles['year-input-heading']}>
      멋사{' '}
      <input
        className={styles['year-input-input']}
        type='number'
        min={0}
      />
      기 지원서
    </h1>
  );
}
