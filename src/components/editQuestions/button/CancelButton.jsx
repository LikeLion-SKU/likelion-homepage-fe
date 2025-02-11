import { FaX } from 'react-icons/fa6';

import ButtonLayout from '@/components/editQuestions/button/Button.Layout';

import styles from './Button.module.css';

export default function CanelButton({ onClick }) {
  return (
    <ButtonLayout
      color='bright'
      size='small'
      onClick={() => onClick()}
    >
      <FaX className={`${styles['btn__icon']} ${styles['btn__icon--red']}`} />
    </ButtonLayout>
  );
}
