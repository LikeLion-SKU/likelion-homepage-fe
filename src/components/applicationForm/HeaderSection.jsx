import styles from '@components/applicationForm/HeaderSection.module.css';

export default function HeaderSection() {
  return (
    <div className={styles.headerContainer}>
      <span className={styles.header}>멋사 13기 지원서</span>
      <div className={styles.buttonWrapper}>
        <button className={styles.saveBtn}>임시저장</button>
      </div>
    </div>
  );
}
