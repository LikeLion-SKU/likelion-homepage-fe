import styles from '@components/applicationForm/QuestionType.module.css';
import PropTypes from 'prop-types';

export default function QuestionType({ clickStep, setClickStep }) {
  const steps = ['기본 인적사항', '공통 질문', '파트별 질문'];

  return (
    <div className={styles.typeContainer}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`${styles.step} ${clickStep === index + 1 ? styles.active : null}`}
          onClick={() => setClickStep(index + 1)}
        >
          <div className={styles.stepInfo}>
            <span>step {index + 1}</span>
            <span>{step}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

QuestionType.propTypes = {
  clickStep: PropTypes.number,
  setClickStep: PropTypes.func,
};
