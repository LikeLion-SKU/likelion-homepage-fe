import DeadLineEditingContainer from '@/components/editQuestions/editingInformationInputSection/DeadLineEditingContainer';

import styles from './EditingInformationSection.module.css';
import YearEditingContainer from '@/components/editQuestions/editingInformationInputSection/YearEditingContainer';
import QuestionBtnContainer from '@/components/editQuestions/editingInformationInputSection/QuestionBtnContainer';

export default function EditingInformationSection() {
  return (
    <section className={styles['editing-Information-Section']}>
      <YearEditingContainer />
      <DeadLineEditingContainer />
      <QuestionBtnContainer />
    </section>
  );
}
