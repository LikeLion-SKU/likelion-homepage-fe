import styles from '@components/applicationForm/HeaderSection.module.css';
import { useNavigate } from 'react-router-dom';

export default function ViewFormHeader({ name, url, btnMsg }) {
  const navigate = useNavigate();
  return (
    <div className={styles.headerContainer}>
      <span className={styles.header}>{name}의 지원서</span>
      <div className={styles.buttonWrapper}>
        <button
          onClick={() => navigate(url)}
          className={styles.saveBtn}
        >
          {btnMsg}
        </button>
      </div>
    </div>
  );
}
