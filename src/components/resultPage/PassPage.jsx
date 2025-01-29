import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './passPage.module.css';
import { getResult } from '@/api/resultAPI';

export default function PassPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // isPassed가 true여야만 pass 페이지에 접근할 수 있음
    const fetchResult = async function () {
      try {
        const response = await getResult({
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.isPassed) {
          navigate('/result');
        }
      } catch {
        navigate('/result');
      }
    };

    fetchResult();
  }, [navigate]);

  const interviewDates = [
    { date: '2025년 3월 10일 월요일' },
    { date: '2025년 3월 11일 화요일' },
    { date: '2025년 3월 12일 수요일' },
    { date: '2025년 3월 13일 목요일' },
  ];

  function handleDateClick(date) {
    setSelectedDate(date);
  }

  return (
    <div className={styles.allContainer}>
      <div className={styles.titleContainer}>
        <p className={styles.mainTitle}>🎉 서류 합격을 축하드립니다 🎉</p>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.content}>1차 서류 지원에 합격하셨습니다.</p>
        <p className={styles.content}>아래에서 2차 면접 날짜를 선택해주세요.</p>
        <div className={styles.datePickerContainer}>
          {interviewDates.map((item, index) => (
            <div
              key={index}
              className={`${styles.dateItem} ${selectedDate === item.date ? styles.selected : ''}`}
              onClick={() => handleDateClick(item.date)}
            >
              <p className={styles.date}>{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
