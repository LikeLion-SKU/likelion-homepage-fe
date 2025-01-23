import styles from './DeadLineInput.module.css';

export default function DeadLineInput() {
  return (
    <>
      <label className={styles['dead-line-label']}>마감 날짜</label>
      <input
        className={styles['dead-line-input']}
        type='date'
      />
    </>
  );
}
