import { LuPencil } from 'react-icons/lu';

import ButtonLayout from '@/components/editQuestions/button/Button.Layout';

import styles from './Button.module.css';

export default function EditButton({ onClick }) {
  return (
    <ButtonLayout
      color='bright'
      size='small'
      onClick={() => onClick()}
    >
      <LuPencil className={styles['btn__icon']} />
    </ButtonLayout>
  );
}
