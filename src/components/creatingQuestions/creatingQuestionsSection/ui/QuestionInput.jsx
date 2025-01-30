import { FaRegTrashAlt } from 'react-icons/fa';

import styles from './QuestionInput.module.css';

export default function QuestionInput({ updateQuestionContent, deleteQuestion, content, id }) {
  return (
    <div className={styles['question-input-container']}>
      <input
        className={styles['question-input']}
        placeholder='질문을 입력해주세요'
        value={content}
        onChange={function (e) {
          updateQuestionContent(id, e.target.value);
        }}
      />
      <button
        className={styles['question-input-btn']}
        onClick={function () {
          deleteQuestion(id);
        }}
      >
        <FaRegTrashAlt className={styles['question-input-btn__trashicon']} />
      </button>
    </div>
  );
}
