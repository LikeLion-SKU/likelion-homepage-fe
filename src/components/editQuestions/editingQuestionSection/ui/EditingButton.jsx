import { LuPencil } from 'react-icons/lu';

import styles from './EditingButton.module.css';

export default function EditingButton({ onClick }) {
  return (
    <button
      className={styles['editing-btn']}
      onClick={function () {
        onClick();
      }}
    >
      <LuPencil className={styles['editing-btn__pencilIcon']} />
    </button>
  );
}
