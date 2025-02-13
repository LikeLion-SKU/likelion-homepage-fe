import { useEffect, useState } from 'react';
import { getMyInterviewSchedule, deleteInterviewBooking } from '@/api/interviewAPI';
import { Link, useNavigate } from 'react-router-dom';
import styles from './MySchedulePage.module.css';

export default function MySchedulePage() {
  const [schedule, setSchedule] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await getMyInterviewSchedule();
        setSchedule(response.data);
      } catch (error) {
        setError('면접 일정을 불러오는 중 오류가 발생했습니다. 관리자에게 문의해주세요');
      }
    };

    fetchSchedule();
  }, []);

  const handleCancelInterview = async (bookingId) => {
    if (window.confirm('면접 일정을 취소하시겠습니까? 취소 후에는 복구가 불가능합니다.')) {
      try {
        await deleteInterviewBooking(bookingId);
        alert('면접 일정이 취소되었습니다. 면접일정을 다시 예약해주세요.');
        navigate('/pass');
      } catch (error) {
        alert('면접 일정 취소 중 오류가 발생했습니다. 관리자에게 문의해주세요');
      }
    }
  };

  if (error) return <div className={styles.error}>{error}</div>;
  if (!schedule || schedule.length === 0) return <div className={styles.empty}>예정된 면접 일정이 없습니다.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>나의 면접 일정</h1>
        {schedule.map((interview) => (
          <div
            key={interview.bookingId}
            className={styles.scheduleCard}
          >
            <h2 className={styles.partTitle}>PART : {interview.part}</h2>
            <p className={styles.partTitle}>날짜: {interview.date}</p>
            <p className={styles.partTitle}>
              시간: {interview.startTime} - {interview.endTime}
            </p>

            <div className={styles.notice}>
              <h3>안내사항</h3>
              <ul>
                <p>1. 면접 일정 취소 시 복구가 불가능하며, 다시 면접 일정을 예약하셔야합니다.</p>
                <p>2. 원하는 일정이 없을시 예약이 불가합니다.</p>
                <p>3. 면접 취소 후 다시 일정 예약을 안하실 경우 면접을 보실 수 없습니다.</p>
                <p>4. 면접 취소 후 다시 일정 예약이 가능합니다.</p>
                <p>
                  5. 남은 면접 일정은{' '}
                  <Link
                    to='/pass'
                    className={styles.link}
                  >
                    여기
                  </Link>
                  에서 미리 보실 수 있습니다
                </p>
                <p>6. 면접 취소 시 일정 예약하기 페이지로 이동합니다.</p>
              </ul>
            </div>

            <button
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={() => handleCancelInterview(interview.bookingId)}
            >
              면접 일정 취소하기
            </button>
          </div>
        ))}
        <button
          className={styles.button}
          onClick={() => navigate('/mypage')}
        >
          마이페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}
