import { FaRegTrashAlt } from 'react-icons/fa';
import styles from './DeleteButton.module.css';

export default function DeleteButton() {
  return (
    <button className={styles['delete-btn']}>
      <FaRegTrashAlt className={styles['delete-btn__trashIcon']} />
    </button>
  );
}
