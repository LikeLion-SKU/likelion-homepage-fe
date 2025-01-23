import styles from './DeadLineInput.module.css';

export default function DeadLineInput() {
  return (
    <>
      <label
        className={styles['dead-line-label']}
        htmlFor='dead-line-input'
      >
        마감 날짜
      </label>
      <input
        className={styles['dead-line-input']}
        type='date'
        id='dead-line-input'
      />
    </>
  );
}
