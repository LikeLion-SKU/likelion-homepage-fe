import styles from './InformationInputSection.module.css';

import QuestionBtnContainer from '@/components/creatingQuestions/informationInputSection/QuestionBtnContainer';

export default function InformationInputSection() {
  return (
    <section className={styles['input-Information-Section']}>
      <QuestionBtnContainer />
    </section>
  );
}
