import styles from './InformationInputSection.module.css';

import QuestionBtnContainer from '@/components/creatingQuestions/informationInputSection/QuestionBtnContainer';
import DeadLineInputContainer from '@/components/creatingQuestions/informationInputSection/DeadLineInputContainer';
import YearInputContainer from '@/components/creatingQuestions/informationInputSection/YearInputContainer';
import StartLineInputContainer from '@/components/creatingQuestions/informationInputSection/StartLineInputContainer';
import ResultLineInputContainer from '@/components/creatingQuestions/informationInputSection/ResultLineInputContainer';

export default function InformationInputSection() {
  return (
    <section className={styles['input-Information-Section']}>
      <YearInputContainer />
      <StartLineInputContainer />
      <DeadLineInputContainer />
      <ResultLineInputContainer />
      <QuestionBtnContainer />
    </section>
  );
}
