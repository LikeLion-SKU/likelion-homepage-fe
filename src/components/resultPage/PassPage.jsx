import { useState } from 'react';
import styles from './passPage.module.css';

export default function PassPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // 더미 데이터
  const interviewDates = [
    {
      date: '2025년 3월 10일 월요일',
      slots: ['18:00 - 18:30', '18:30 - 19:00', '19:00 - 19:30', '19:30 - 20:00', '20:00 - 20:30', '20:30 - 21:00'],
    },
    {
      date: '2025년 3월 11일 화요일',
      slots: ['18:00 - 18:30', '18:30 - 19:00', '19:00 - 19:30', '19:30 - 20:00', '20:00 - 20:30', '20:30 - 21:00'],
    },
    {
      date: '2025년 3월 12일 수요일',
      slots: ['18:00 - 18:30', '18:30 - 19:00', '19:00 - 19:30', '19:30 - 20:00', '20:00 - 20:30', '20:30 - 21:00'],
    },
  ];

  // 날짜 클릭 후 시간 표시
  function handleDateClick(date) {
    setSelectedDate(function (prevDate) {
      return prevDate === date ? null : date;
    });
    setSelectedSlot(null); // 날짜 변경 시 slot 초기화화
  }

  function handleSlotClick(date, slot) {
    setSelectedSlot(function (prevSlot) {
      return prevSlot && prevSlot.date === date && prevSlot.slot === slot
        ? null // 같은 슬롯을 다시 클릭하면 선택 취소
        : { date, slot }; // 새로운 슬롯을 선택하면 업데이트
    });
    setSelectedDate(date); // 슬롯을 클릭하면 해당 날짜도 선택되게 설정
  }

  // 날짜 클릭 처리 함수
  function handleDateItemClick(item) {
    handleDateClick(item.date);
  }

  // 슬롯 클릭 처리 함수
  function handleSlotItemClick(e, item, slot) {
    e.stopPropagation(); // 부모의 onClick 이벤트가 발생하지 않도록
    handleSlotClick(item.date, slot);
  }

  return (
    <div className={styles.allContainer}>
      <div className={styles.titleContainer}>
        <p className={styles.mainTitle}>🎉 서류 합격을 축하드립니다 🎉</p>
      </div>

      <div className={styles.contentContainer}>
        <p className={styles.content}>안녕하세요. IT동아리 멋쟁이사자처럼 서경대학교 12기입니다.</p>
        <p className={styles.content}>프론트엔드 파트 1차 서류 합격을 진심으로 축하드립니다.</p>
        <p className={styles.content}>
          함께하고 싶으신 분들이 너무 많아 지원서를 여러 번 읽어보고 모든 운영진들이 고심 끝에 결정하였습니다.
        </p>
        <p className={styles.content}>어떤 분들을 만나 뵙게 될지 기대하고 있겠습니다.</p>
        <p className={styles.content}>아래에서 2차 면접 날짜를 선택 후 3월 9일 자정까지 반드시 입력해 주세요.</p>
        <p className={styles.content}>면접 장소는 청운관 1004호입니다.</p>
      </div>

      <div className={styles.subTitle}>면접 날짜 선택</div>

      <div className={styles.datePickerContainer}>
        {interviewDates.map(function (item, index) {
          return (
            <div
              key={index}
              className={styles.dateItem}
              onClick={function () {
                handleDateItemClick(item);
              }}
            >
              <p className={`${styles.date} ${selectedDate === item.date ? styles.selected : ''}`}>{item.date}</p>
              <div className={styles.slotsContainer}>
                {item.slots.map(function (slot, slotIndex) {
                  return (
                    <p
                      key={slotIndex}
                      className={`${styles.slot} 
                        ${selectedSlot && selectedSlot.date === item.date && selectedSlot.slot === slot ? styles.selectedSlot : ''}`}
                      onClick={function (e) {
                        handleSlotItemClick(e, item, slot);
                      }}
                    >
                      {slot}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
