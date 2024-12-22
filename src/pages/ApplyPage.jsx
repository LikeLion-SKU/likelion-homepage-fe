import BodySection from '@components/applicationForm/BodySection';
import HeaderSection from '@components/applicationForm/HeaderSection';
import styles from '@styles/applyPage/Apply.module.css';

export default function ApplicationForm() {
  return (
    <div className={styles.pageWrapper}>
      <HeaderSection />
      <BodySection />
    </div>
  );
}
