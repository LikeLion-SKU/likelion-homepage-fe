import { FaRegTrashAlt } from 'react-icons/fa';

import styles from './QuestionEditing.module.css';

export default function QuestionEditing({ content }) {
  return (
    <div className={styles['question-editing-container']}>
      <input
        className={styles['question-input']}
        value={content}
      />
      <button className={styles['question-input-btn']}>
        <FaRegTrashAlt className={styles['question-input-btn__trashicon']} />
      </button>
    </div>
  );
}
