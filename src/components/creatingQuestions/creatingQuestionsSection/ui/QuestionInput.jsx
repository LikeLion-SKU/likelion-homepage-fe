import { FaRegTrashAlt } from 'react-icons/fa';

import styles from './QuestionInput.module.css';

export default function QuestionInput() {
  return (
    <>
      <input
        className={styles['question-input']}
        placeholder='질문을 입력해주세요'
      />
      <button className={styles['question-input-btn']}>
        <FaRegTrashAlt className={styles['question-input-btn__trashicon']} />
      </button>
    </>
  );
}
