import styles from './InformationInputSection.module.css';

import QuestionBtnContainer from '@/components/creatingQuestions/informationInputSection/QuestionBtnContainer';
import DeadLineInputContainer from '@/components/creatingQuestions/informationInputSection/DeadLineInputContainer';
import YearInputContainer from '@/components/creatingQuestions/informationInputSection/YearInputContainer';

export default function InformationInputSection() {
  return (
    <section className={styles['input-Information-Section']}>
      <YearInputContainer />
      <DeadLineInputContainer />
      <QuestionBtnContainer />
    </section>
  );
}
