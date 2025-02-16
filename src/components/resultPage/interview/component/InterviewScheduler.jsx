import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './interviewScheduler.module.css';
import { useInterviewSchedule } from '../hooks/useInterviewSchedule';
import { getUserPart, bookInterview } from '@api/interviewAPI';

function InterviewScheduler({ isSubmitEnabled }) {
  const [userPart, setUserPart] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(function () {
    async function fetchUserPart() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('로그인이 필요합니다.');
          return;
        }
        const response = await getUserPart();
        setUserPart(response);
      } catch (err) {
        console.error('Error fetching user part:', err);
        alert('사용자 정보를 불러오는데 실패했습니다. 다시 로그인해주세요');
        localStorage.removeItem('token'); // 토큰 삭제
        localStorage.removeItem('refreshToken'); // 토큰 삭제
        navigate('/login');
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
      const dateItem = scheduleData.find((d) => d.date === date);
      return {
        date,
        rawDate: dateItem.rawDate, // 원본 날짜 추가
        time: slot.time,
        startTime: slot.startTime,
        endTime: slot.endTime,
      };
    });
    setSelectedDate(date);
  }

  async function handleSubmit() {
    if (!selectedSlot || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const dateObject = scheduleData.find((d) => d.date === selectedSlot.date);
      if (!dateObject) throw new Error('선택된 날짜를 찾을 수 없습니다.');

      const bookingData = {
        part:
          userPart === '기획'
            ? 'PM'
            : userPart === '디자인'
              ? 'DESIGN'
              : userPart === '프론트엔드'
                ? 'FRONTEND'
                : 'BACKEND',
        date: dateObject.rawDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      };

      await bookInterview(bookingData);
      navigate('/interview/success', {
        state: {
          date: selectedSlot.date,
          time: selectedSlot.time,
        },
      });
    } catch (err) {
      if (err.response?.data?.code === 'ALREADY_BOOKED') {
        alert('이미 예약된 시간입니다.');
        navigate(0);
      }
      if (err.response?.data?.code === 'DUPLICATE_PART_BOOKING') {
        alert('이미 면접일정을 선택완료 하였습니다.');
        navigate('/mypage');
      } else {
        alert('면접 시간 예약에 실패했습니다. 다시 시도해주세요.');
        navigate(0);
      }
    } finally {
      setIsSubmitting(false);
    }
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
        disabled={!selectedSlot || !isSubmitEnabled || isSubmitting}
      >
        면접 시간 선택 완료
      </button>
    </div>
  );
}

export default InterviewScheduler;
