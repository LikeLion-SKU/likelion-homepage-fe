import DeadLineEditingContainer from '@/components/editQuestions/editingInformationInputSection/DeadLineEditingContainer';

import styles from './EditingInformationSection.module.css';

export default function EditingInformationSection() {
  return (
    <section className={styles['input-Information-Section']}>
      <DeadLineEditingContainer />
    </section>
  );
}
