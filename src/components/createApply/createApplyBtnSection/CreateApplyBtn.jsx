import { useNavigate } from 'react-router-dom';

import styles from './CreateApplyBtn.module.css';

export default function CreateApplyBtn() {
  const navigate = useNavigate();

  return (
    <button
      className={styles['create-apply-btn']}
      onClick={function () {
        navigate('/admin/questions');
      }}
    >
      <p className={styles['create-apply-btn__plus']}>+</p>
    </button>
  );
}
