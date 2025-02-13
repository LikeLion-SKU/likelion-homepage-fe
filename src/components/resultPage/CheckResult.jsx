import { useState, useEffect } from 'react';
import styles from './checkResult.module.css';
import { getDate, getResult } from '@api/resultAPI';
import { useNavigate } from 'react-router-dom';

export default function CheckResult() {
  const [createdAt, setCreatedAt] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = () => {
      const canAccessResult = localStorage.getItem('canAccessResult');
      if (!canAccessResult || canAccessResult !== 'true') {
        navigate('/notallowed');
        return false;
      }
      return true;
    };

    if (!checkAccess()) return;

    const fetchDate = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await getDate({
          headers: { Authorization: `Bearer ${token}` },
        });
        setCreatedAt(response.createdAt.replace('T', ' '));
      } catch {
        location.href = '/error';
      }
    };

    fetchDate();
  }, [navigate]);

  const handleCheckResult = async function () {
    try {
      const token = localStorage.getItem('token');

      const response = await getResult({
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.isPassed) {
        navigate('/pass');
      } else {
        navigate('/fail');
      }
    } catch {
      alert('결과를 가져오는 중 오류 발생. 관리자에게 문의해주세요.');
    }
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.titleContainer}>
        <p className={styles.mainTitle}>지원 결과 확인하기</p>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.content}>지원에 감사드립니다.</p>
        <p className={styles.content}>결과를 확인해주세요.</p>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          최종 제출 일자 : <span>{createdAt}</span>
        </div>
        <button
          className={styles.checkButton}
          onClick={handleCheckResult}
        >
          확인하기
        </button>
      </div>
    </div>
  );
}
