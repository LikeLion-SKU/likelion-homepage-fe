import BodySection from '@components/applicationForm/BodySection';
import HeaderSection from '@components/applicationForm/HeaderSection';
import styles from './Apply.module.css';

export default function ApplyPage() {
  return (
    <div className={styles.pageWrapper}>
      <HeaderSection />
      <BodySection />
    </div>
  );
}
