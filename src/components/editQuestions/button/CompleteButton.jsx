import { FaCheck } from 'react-icons/fa6';

import ButtonLayout from '@/components/editQuestions/button/Button.Layout';

import styles from './Button.module.css';

export default function CompleteButton({ onClick }) {
  return (
    <ButtonLayout
      color='bright'
      size='small'
      onClick={() => onClick()}
    >
      <FaCheck className={styles['btn__icon']} />
    </ButtonLayout>
  );
}
