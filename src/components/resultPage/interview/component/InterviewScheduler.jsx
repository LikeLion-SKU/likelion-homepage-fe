import { useState, useEffect } from 'react';
import styles from './interviewScheduler.module.css';
import { useInterviewSchedule } from '../hooks/useInterviewSchedule';
import { getUserPart } from '@api/interviewAPI';

function InterviewScheduler() {
  const [userPart, setUserPart] = useState(null);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchUserPart() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('로그인이 필요합니다.');
          return;
        }

        const response = await getUserPart();
        setUserPart(response.data);
      } catch (err) {
        console.error('Error fetching user part:', err);
        setError('사용자 정보를 불러오는데 실패했습니다.');
      }
    }

    fetchUserPart();
  }, []);

  const {
    scheduleData,
    selectedDate,
    selectedSlot,
    error: scheduleError,
    setSelectedDate,
    setSelectedSlot,
  } = useInterviewSchedule(userPart);

  function handleDateClick(date) {
    setSelectedDate(function (prevDate) {
      return prevDate === date ? null : date;
    });
    setSelectedSlot(null);
  }

  function handleSlotClick(e, date, slot) {
    e.stopPropagation();
    if (!slot.isAvailable) return;

    setSelectedSlot(function (prevSlot) {
      if (prevSlot && prevSlot.date === date && prevSlot.time === slot.time) {
        return null;
      }
      return { date, time: slot.time };
    });
    setSelectedDate(date);
  }

  function handleSubmit() {
    // 여기에 제출 로직 추가
    // 백엔드 API 만들어야함
    if (selectedSlot) {
      console.log('Selected interview time:', selectedSlot);
      // API 호출 등 추가
    }
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (scheduleError) {
    return <div className={styles.error}>{scheduleError}</div>;
  }

  if (!userPart) {
    return <div className={styles.error}>면접 파트 정보를 찾을 수 없습니다.</div>;
  }

  if (!scheduleData || scheduleData.length === 0) {
    return <div className={styles.empty}>현재 등록된 면접 일정이 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{userPart} 면접 날짜/시간 선택</h2>
      <div className={styles.dateContainer}>
        {scheduleData.map(function (dateItem) {
          return (
            <div
              key={dateItem.rawDate}
              className={styles.dateGroup}
              onClick={function () {
                handleDateClick(dateItem.date);
              }}
            >
              <h3 className={`${styles.dateTitle} ${selectedDate === dateItem.date ? styles.dateTitleSelected : ''}`}>
                {dateItem.date}
              </h3>
              <div className={styles.slotsGrid}>
                {dateItem.slots.map(function (slot) {
                  return (
                    <button
                      key={`${dateItem.rawDate}-${slot.startTime}-${slot.endTime}`}
                      className={`${styles.timeSlot} ${!slot.isAvailable ? styles.unavailable : ''} ${
                        selectedSlot && selectedDate === dateItem.date && selectedSlot.time === slot.time
                          ? styles.timeSlotSelected
                          : ''
                      }`}
                      onClick={function (e) {
                        handleSlotClick(e, dateItem.date, slot);
                      }}
                      disabled={!slot.isAvailable}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {selectedSlot ? (
        <div className={styles.selectedInfo}>
          선택된 면접 시간: {selectedSlot.date} {selectedSlot.time}
        </div>
      ) : null}

      <button
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={!selectedSlot}
      >
        면접 시간 선택 완료
      </button>
    </div>
  );
}

export default InterviewScheduler;
