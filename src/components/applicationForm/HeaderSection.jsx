import styles from '@components/applicationForm/HeaderSection.module.css';

export default function HeaderSection() {
  return (
    <div className={styles.headerContainer}>
      <span className={styles.header}>멋사 13기 아기사자 지원서</span>
      <div className={styles.buttonWrapper}>
        <button className={styles.saveBtn}>임시저장</button>
        <button className={styles.submitBtn}>제출하기</button>
      </div>
    </div>
  );
}
