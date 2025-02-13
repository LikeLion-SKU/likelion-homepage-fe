import { FaRegTrashAlt } from 'react-icons/fa';

import ButtonLayout from '@/components/editQuestions/button/ui/Button.Layout';

import styles from './Button.module.css';

export default function DeleteButton({ onClick }) {
  return (
    <ButtonLayout
      color='bright'
      size='small'
      onClick={() => onClick()}
      rounded='none'
    >
      <FaRegTrashAlt className={`${styles['btn__icon']} ${styles['btn__icon--red']}`} />
    </ButtonLayout>
  );
}
