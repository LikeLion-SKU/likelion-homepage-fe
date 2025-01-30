import ApplicationStoredContainer from '@/components/createApply/applicationSection/ApplicationStoredContainer';
import ApplicationOnGoingContainer from './ApplicationOnGoingContainter';
import styles from './ApplicationSection.module.css';

export default function ApplicationSection() {
  return (
    <section className={styles['application-section']}>
      <ApplicationOnGoingContainer />
      <ApplicationStoredContainer />
    </section>
  );
}
