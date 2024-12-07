import styles from '@components/applicationForm/QuestionType.module.css';
import PropTypes from 'prop-types';

export default function QuestionType({ step }) {
  const steps = ['기본 인적사항', '공통 질문', '파트별 질문'];

  return (
    <div className={styles.typeContainer}>
      {steps.map((item, index) => (
        <div
          key={index}
          className={`${styles.step} ${step === index + 1 ? styles.active : null}`}
        >
          <div className={styles.stepInfo}>
            <span>step {index + 1}</span>
            <span>{item}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

QuestionType.propTypes = {
  step: PropTypes.number,
  setClickStep: PropTypes.func,
};
