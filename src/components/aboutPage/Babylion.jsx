import styles from './aboutPage.module.css';
import PlanDesign from './PlanDesign';
import Plan from './Plan';
import Design from './Design';
import FrontEnd from './FrontEnd';
import BackEnd from './BackEnd';

export default function Babylion() {
  return (
    <div className={styles.allContainer}>
      <div className={styles.managementContainer}>
        <p className={styles.mainText}>아기사자</p>
        <PlanDesign />
        <Plan />
        <Design />
        <FrontEnd />
        <BackEnd />
      </div>
    </div>
  );
}
