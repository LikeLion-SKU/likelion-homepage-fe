import { FaX } from 'react-icons/fa6';

import ButtonLayout from '@/components/editQuestions/button/ui/Button.Layout';

import styles from './Button.module.css';

export default function CancelButton({ onClick }) {
  return (
    <ButtonLayout
      color='bright'
      size='small'
      onClick={() => onClick()}
      rounded='none'
    >
      <FaX className={`${styles['btn__icon']} ${styles['btn__icon--red']}`} />
    </ButtonLayout>
  );
}
