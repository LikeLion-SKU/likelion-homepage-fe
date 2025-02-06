import styles from './YearInput.module.css';

export default function YearInput({ value, isEditing, setUpdatedSemester }) {
  return (
    <h1 className={styles['year-input-heading']}>
      멋사{' '}
      {isEditing ? (
        <input
          className={styles['year-input-input']}
          type='number'
          min={0}
          defaultValue={value}
          onChange={function (e) {
            setUpdatedSemester(e.target.value);
          }}
        />
      ) : (
        <input
          className={styles['year-input-input']}
          type='number'
          min={0}
          defaultValue={value}
          readOnly={true}
        />
      )}
      기 지원서
    </h1>
  );
}
