import styles from './passPage.module.css';
import ConsentCheckboxes from './ConsentCheckboxes';
import WelcomeSection from './interview/component/WelcomeSection';
import InterviewScheduler from './interview/component/InterviewScheduler';

export default function PassPage() {
  return (
    <div className={styles.allContainer}>
      {/** 안내 문구 */}
      <WelcomeSection />
      {/** 참석 동의 같은거 */}
      <ConsentCheckboxes />
      {/** 시간 정하는거거 */}
      <InterviewScheduler />
    </div>
  );
}
