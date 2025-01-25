import { FiPlusCircle } from 'react-icons/fi';

import styles from './CreateQuestionBtn.module.css';

export default function CreateQuestionBtn() {
  return (
    <button className={styles['create-question-btn']}>
      <FiPlusCircle className={styles['create-question-btn__plus']} />
    </button>
  );
}
