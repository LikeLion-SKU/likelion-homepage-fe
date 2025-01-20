import styles from '@pages/Apply.module.css';
import ViewFormHeader from './ViewFormHeader';
import FormBody from './FormBody';
import { useParams } from 'react-router-dom';

export default function ViewForm() {
  const { studentId } = useParams();

  return (
    <div className={styles.pageWrapper}>
      <ViewFormHeader
        name='김예찬'
        onClick={() => {}}
        url='/admin/apply'
        btnMsg='목록으로'
      />
      <FormBody studentId={studentId} />
    </div>
  );
}
