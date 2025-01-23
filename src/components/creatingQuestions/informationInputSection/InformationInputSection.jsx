import styles from './InformationInputSection.module.css';

import QuestionBtnContainer from '@/components/creatingQuestions/informationInputSection/QuestionBtnContainer';
import DeadLineInputContainer from '@/components/creatingQuestions/informationInputSection/DeadLineInputContainer';

export default function InformationInputSection() {
  return (
    <section className={styles['input-Information-Section']}>
      <DeadLineInputContainer />
      <QuestionBtnContainer />
    </section>
  );
}
