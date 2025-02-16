import { useState, useEffect } from 'react';
import { getInterviewDates, getInterviewTimes } from '@api/interviewAPI';

export function useInterviewSchedule(koreanPart) {
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [error, setError] = useState(null);

  // 한글 파트 이름을 영문으로 변환하는 매핑
  const PART_MAPPING = {
    기획: 'PM',
    디자인: 'DESIGN',
    프론트엔드: 'FRONTEND',
    백엔드: 'BACKEND',
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = days[date.getDay()];

    return `${month}월 ${day}일 (${dayOfWeek})`;
  }

  function formatTime(timeString) {
    return timeString.substring(0, 5);
  }

  useEffect(
    function () {
      async function fetchScheduleData() {
        if (!koreanPart) return;

        try {
          const englishPart = PART_MAPPING[koreanPart];
          if (!englishPart) {
            setError('유효하지 않은 파트입니다.');
            return;
          }

          const [datesResponse, timesResponse] = await Promise.all([getInterviewDates(), getInterviewTimes()]);

          const filteredDates = datesResponse.filter(function (date) {
            return date.part === englishPart;
          });

          const formattedData = filteredDates.map(function (date) {
            const dateSlots = timesResponse.filter(function (time) {
              return time.date === date.date && time.part === englishPart;
            });

            return {
              date: formatDate(date.date),
              rawDate: date.date,
              slots: dateSlots.map(function (time) {
                return {
                  time: `${formatTime(time.startTime)} - ${formatTime(time.endTime)}`,
                  isAvailable: !time.booked,
                  startTime: time.startTime,
                  endTime: time.endTime,
                };
              }),
            };
          });

          setScheduleData(formattedData);
          setError(null);
        } catch (err) {
          setError('면접 일정을 불러오는데 실패했습니다.');
          console.error('Error fetching schedule:', err);
        }
      }

      fetchScheduleData();
    },
    [koreanPart],
  );

  return {
    scheduleData,
    selectedDate,
    selectedSlot,
    error,
    setSelectedDate,
    setSelectedSlot,
  };
}
