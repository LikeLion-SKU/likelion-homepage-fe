import styles from './CompleteBtn.module.css';

export default function CompleteBtn({ onClick }) {
  return (
    <button
      className={styles['complete-btn']}
      onClick={function () {
        onClick();
      }}
    >
      완료
    </button>
  );
}
