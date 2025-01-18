import styles from '@components/applicationForm/HeaderSection.module.css';

export default function ViewFormHeader({ name, onClick, url, btnMsg }) {
  return (
    <div className={styles.headerContainer}>
      <span className={styles.header}>{name}의 지원서</span>
      <div className={styles.buttonWrapper}>
        <button className={styles.saveBtn}>{btnMsg}</button>
      </div>
    </div>
  );
}
