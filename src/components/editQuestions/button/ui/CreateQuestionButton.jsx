import { FiPlusCircle } from 'react-icons/fi';

import ButtonLayout from '@/components/editQuestions/button/ui/Button.Layout';

import styles from './Button.module.css';

export default function CreateQuestionButton({ onClick }) {
  return (
    <ButtonLayout
      size='small'
      onClick={() => onClick()}
      color='bright'
      rounded='none'
    >
      <FiPlusCircle className={styles['btn__icon']} />
    </ButtonLayout>
  );
}
