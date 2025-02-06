import DeleteButton from '@/components/editQuestions/editingInformationInputSection/ui/DeleteButton';
import EditingButton from '@/components/editQuestions/editingInformationInputSection/ui/EditingButton';

import styles from './ButtonsContainer.module.css';

export default function ButtonsContainer() {
  return (
    <div className={styles['btns-container']}>
      <EditingButton />
      <DeleteButton />
    </div>
  );
}
