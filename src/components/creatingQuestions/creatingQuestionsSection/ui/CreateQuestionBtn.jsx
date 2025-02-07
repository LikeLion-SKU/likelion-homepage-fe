import { FiPlusCircle } from 'react-icons/fi';

import styles from './CreateQuestionBtn.module.css';

export default function CreateQuestionBtn({ createNewQuestion }) {
  return (
    <button
      className={styles['create-question-btn']}
      onClick={function () {
        createNewQuestion();
      }}
    >
      <FiPlusCircle className={styles['create-question-btn__plus']} />
    </button>
  );
}
