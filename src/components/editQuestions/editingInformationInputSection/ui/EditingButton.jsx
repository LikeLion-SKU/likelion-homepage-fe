import { LuPencil } from 'react-icons/lu';

import styles from './EditingButton.module.css';

export default function EditingButton() {
  return (
    <button className={styles['editing-btn']}>
      <LuPencil className={styles['editing-btn__pencilIcon']} />
    </button>
  );
}
