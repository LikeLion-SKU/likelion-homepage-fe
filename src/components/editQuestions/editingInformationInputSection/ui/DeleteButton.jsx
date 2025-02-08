import { FaRegTrashAlt } from 'react-icons/fa';
import styles from './DeleteButton.module.css';

export default function DeleteButton({ onClick }) {
  return (
    <button
      className={styles['delete-btn']}
      onClick={function () {
        onClick();
      }}
    >
      <FaRegTrashAlt className={styles['delete-btn__trashIcon']} />
    </button>
  );
}
