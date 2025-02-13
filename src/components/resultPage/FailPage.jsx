import styles from './failPage.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getResult } from '@/api/resultAPI';

export default function FailPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // isPassed가 false여야만 fail 페이지에 접근할 수 있음
    const fetchResult = async function () {
      try {
        const response = await getResult({
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.isPassed) {
          navigate('/notallowed');
        }
      } catch {
        navigate('/error');
      }
    };

    fetchResult();
  }, [navigate]);

  return (
    <div className={styles.allContainer}>
      <div className={styles.titleContainer}>
        <p className={styles.mainTitle}>불합격함.</p>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.content}>지원해주셔서 감사한데</p>
        <p className={styles.content}>다음기회에 만나요</p>
        <p className={styles.content}>더 할말 있을까?</p>
        <p className={styles.content}>일단 네줄 정도...</p>
      </div>
    </div>
  );
}
