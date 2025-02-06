import styles from './DeadLineEditingInput.module.css';

export default function DeadLineEditingInput({ value }) {
  return (
    <div className={styles['dead-line-container']}>
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
        defaultValue={value}
        readOnly={true}
      />
    </div>
  );
}
