import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './interviewSuccess.module.css';

function InterviewSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { date, time } = location.state || {};

  useEffect(() => {
    if (!date || !time) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [date, time, navigate]);

  if (!date || !time) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>잘못된 접근입니다.</h1>
          <h1>3초 후에 홈으로 이동합니다...</h1>
          <button
            onClick={() => navigate('/')}
            className={styles.button}
          >
            홈으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>면접 시간 등록이 완료되었습니다!</h1>

        <div className={styles.info}>
          <p className={styles.datetime}>
            <strong>면접 날짜:</strong> {date}
          </p>
          <p className={styles.datetime}>
            <strong>면접 시간:</strong> {time}
          </p>
        </div>

        <div className={styles.notice}>
          <h3>안내사항</h3>
          <ul>
            <p>면접 일정은 마이페이지에서 한번 더 확인 하실 수 있습니다.</p>
            <p>면접 시작 5분 전까지 와주시기 바랍니다.</p>
            <p>면접 불참 시 향후 지원에 불이익이 있을 수 있습니다.</p>
            <p>면접 시간 변경이 필요한 경우 관리자에게 문의해 주세요.</p>
          </ul>
        </div>

        <button
          onClick={() => navigate('/mypage')}
          className={styles.button}
        >
          마이페이지로 이동
        </button>
      </div>
    </div>
  );
}

export default InterviewSuccess;
