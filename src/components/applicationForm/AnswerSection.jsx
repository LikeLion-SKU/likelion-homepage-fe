import styles from '@components/applicationForm/AnswerSection.module.css';
import { useStore } from '@store/useStore';
import PropTypes from 'prop-types';

export default function AnswerSection({ step }) {
  const questions = [
    ['어쩌구저쩌구', '어쩌구저쩌구', '어쩌구저쩌구'],
    ['어쩌구저쩌구2', '어쩌구저쩌구', '어쩌구저쩌구'],
    ['어쩌구저쩌구3', '어쩌구저쩌구', '어쩌구저쩌구'],
  ];
  const { setAnswer } = useStore();

  return (
    <div className={styles.sectionWrapper}>
      {questions[step - 1].map((question, index) => (
        <div key={index} className={styles.question}>
          <div className={styles.questionName}>
            <span>
              Q{index + 1}. {question}
            </span>
          </div>
          <div className={styles.inputWrapper}>
            <textarea
              onChange={(e) => setAnswer(e.target.value, index, step)}
              placeholder="답변을 입력해주세요"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

AnswerSection.propTypes = {
  step: PropTypes.number,
};
