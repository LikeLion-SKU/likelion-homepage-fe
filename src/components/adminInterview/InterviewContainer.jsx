import { useState, useEffect } from 'react';
import styles from './InterviewContainer.module.css';
import trash from '@assets/interviewPage/trash.webp';
import {
  registerInterviewDate,
  getInterviewDates,
  deleteInterviewDate,
  getInterviewTimes,
  registerInterviewTime,
  deleteInterviewTime,
} from '@api/interviewAPI';

export default function InterviewContainer() {
  // 상태 관리
  const [selectedPart, setSelectedPart] = useState('PM');
  const [newDate, setNewDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [interviewDates, setInterviewDates] = useState([]);
  const [interviewTimes, setInterviewTimes] = useState([]);
  const [error, setError] = useState(null);

  /**
   * 날짜와 시간 데이터를 서버에서 가져오는 함수
   */
  function fetchInterviewData() {
    Promise.all([getInterviewDates(), getInterviewTimes()])
      .then(function ([datesResponse, timesResponse]) {
        setInterviewDates(datesResponse.data || []);
        setInterviewTimes(timesResponse.data || []);
        setError(null);
      })
      .catch(function () {
        setError('데이터를 불러오는데 실패했습니다.');
      });
  }

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(function () {
    fetchInterviewData();
  }, []);

  /**
   * 파트 선택 핸들러
   * @param {Event} e - 이벤트 객체
   */
  function handlePartChange(e) {
    setSelectedPart(e.target.value);
  }

  /**
   * 날짜 선택 핸들러
   * @param {Event} e - 이벤트 객체
   */
  function handleDateChange(e) {
    setNewDate(e.target.value);
  }

  /**
   * 날짜 등록 핸들러
   */
  function handleRegisterDate() {
    if (!selectedPart || !newDate) {
      alert('파트와 날짜를 모두 선택해주세요.');
      return;
    }

    registerInterviewDate(selectedPart, newDate)
      .then(function () {
        alert(`${selectedPart} ${newDate}면접일이 등록되었습니다.`);
        setNewDate('');
        fetchInterviewData(); // 데이터 새로고침
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message || '날짜 등록에 실패했습니다.');
        } else if (error.request) {
          alert('서버와의 통신에 실패했습니다.');
        } else {
          alert('요청 처리 중 오류가 발생했습니다.');
        }
      });
  }

  /**
   * 면접 날짜 삭제 핸들러
   */
  function handleDeleteDate(part, date) {
    if (window.confirm('해당 날짜와 모든 면접 시간이 삭제됩니다. 계속하시겠습니까?')) {
      deleteInterviewDate(part, date)
        .then(function () {
          alert(`${part}의 ${date}, 일정이 삭제되었습니다.`);
          fetchInterviewData(); // 데이터 새로고침
        })
        .catch(function (error) {
          if (error.response) {
            alert(error.response.data.message || '날짜 삭제에 실패했습니다.');
          } else if (error.request) {
            alert('서버와의 통신에 실패했습니다.');
          } else {
            alert('요청 처리 중 오류가 발생했습니다.');
          }
        });
    }
  }

  /**
   * HH:mm:ss 형식의 시간을 HH:mm 형식으로 변환
   */
  function formatTime(time) {
    return time.substring(0, 5); // "HH:mm:ss" -> "HH:mm"
  }

  /**
   * 시작 시간 변경 핸들러
   * @param {Event} e - 이벤트 객체
   */
  function handleStartTimeChange(e) {
    setStartTime(e.target.value);
  }

  /**
   * 종료 시간 변경 핸들러
   * @param {Event} e - 이벤트 객체
   */
  function handleEndTimeChange(e) {
    setEndTime(e.target.value);
  }

  /**
   * 시간 등록 핸들러
   */
  function handleRegisterTime() {
    // 입력값 검증
    if (!selectedPart || !newDate) {
      alert('파트와 날짜를 선택해주세요.');
      return;
    }

    if (!startTime || !endTime) {
      alert('시작 시간과 종료 시간을 모두 선택해주세요.');
      return;
    }

    // 시간 유효성 검사
    if (startTime >= endTime) {
      alert('종료 시간은 시작 시간보다 늦어야 합니다.');
      return;
    }

    const timeData = {
      part: selectedPart,
      date: newDate,
      startTime: startTime,
      endTime: endTime,
    };

    registerInterviewTime(timeData)
      .then(function () {
        alert(`${timeData} 시간이 성공적으로 등록되었습니다.`);
        // 입력 필드 초기화
        setStartTime('');
        setEndTime('');
        // 데이터 새로고침
        fetchInterviewData();
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message || '시간 등록에 실패했습니다.');
        } else if (error.request) {
          alert('서버와의 통신에 실패했습니다.');
        } else {
          alert('요청 처리 중 오류가 발생했습니다.');
        }
      });
  }

  /**
   * 면접 시간 삭제 핸들러
   */
  function handleDeleteTime(part, date, startTime, endTime) {
    if (window.confirm('해당 면접 시간을 삭제하시겠습니까?')) {
      deleteInterviewTime(part, date, startTime, endTime)
        .then(function () {
          alert(`${part}의 ${date}일의 ${startTime}~${endTime} 삭제되었습니다.`);
          fetchInterviewData(); // 데이터 새로고침
        })
        .catch(function (error) {
          if (error.response) {
            alert(error.response.data.message || '시간 삭제에 실패했습니다.');
          } else if (error.request) {
            alert('서버와의 통신에 실패했습니다.');
          } else {
            alert('요청 처리 중 오류가 발생했습니다.');
          }
        });
    }
  }

  return (
    <div className={styles.container}>
      {/* 사용법 카드 */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>사용법</h2>
        <p className={styles.guideText}>1. 무조건 날짜 먼저 등록 ex: PM의 면접날을 먼저 등록</p>
        <p className={styles.guideText}>
          2. 이후 면접 시간 등록, 중복된 시간 등록 불가 ex: 18:00-18:30이 있는데 18:00-18:15 등록불가
        </p>
        <div className={styles.cardContent}>
          <p className={styles.guideTitle}>날짜 등록</p>
          <p className={styles.guideText}>1. 파트를 선택. (PM / Design / FRONTEND / BACKEND)</p>
          <p className={styles.guideText}>2. 원하는 면접 날짜를 선택.</p>
          <p className={styles.guideText}>3. [날짜 등록] 버튼 클릭시 면접 날짜 등록.</p>

          <p className={styles.guideTitle}>시간 등록</p>
          <p className={styles.guideText}>1. 등록된 날짜 중 시간을 등록할 날짜의 파트 선택.</p>
          <p className={styles.guideText}>2. 면접 시작 시간과 종료 시간 선택.</p>
          <p className={styles.guideText}>3. [시간 등록] 버튼을 클릭하면 면접 시간이 등록.</p>

          <p className={styles.guideCaution}>* 등록된 날짜와 시간은 하단에서 확인가능.</p>
          <p className={styles.guideCaution}>* user가 선택한 면접 시간은 삭제 불가.</p>
          <p className={styles.guideCaution}>* 면접 날짜 삭제시 해당 날짜의 모든 시간 삭제됨</p>
        </div>
      </div>

      {/* 면접 일정 관리 카드 */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>면접 일정 관리</h2>
        <div>
          {/* 날짜 등록 폼 */}
          <div className={styles.formGroup}>
            <select
              className={styles.select}
              value={selectedPart}
              onChange={handlePartChange}
            >
              <option value='PM'>PM</option>
              <option value='Design'>Design</option>
              <option value='Frontend'>Frontend</option>
              <option value='Backend'>Backend</option>
            </select>
            <input
              type='date'
              className={`${styles.input} ${styles.inputDate}`}
              value={newDate}
              onChange={handleDateChange}
            />
            <button
              className={styles.button}
              onClick={handleRegisterDate}
            >
              날짜 등록
            </button>
          </div>

          {/* 시간 등록 폼 */}
          <div className={styles.formGroup}>
            <input
              type='time'
              className={`${styles.input} ${styles.inputTime}`}
              value={startTime}
              onChange={handleStartTimeChange}
              min='17:00'
              max='22:00'
              list='availableTimes'
            />
            <input
              type='time'
              className={`${styles.input} ${styles.inputTime}`}
              value={endTime}
              onChange={handleEndTimeChange}
              min='17:00'
              max='22:00'
              list='availableTimes'
            />
            <datalist id='availableTimes'>
              <option value='17:00' />
              <option value='17:30' />
              <option value='18:00' />
              <option value='18:30' />
              <option value='19:00' />
              <option value='19:30' />
              <option value='20:00' />
              <option value='20:30' />
              <option value='21:00' />
              <option value='21:30' />
              <option value='22:00' />
            </datalist>
            <button
              className={styles.button}
              onClick={handleRegisterTime}
            >
              시간 등록
            </button>
          </div>
        </div>
      </div>

      {/* 면접 일정 목록 */}
      <div className={styles.grid}>
        {['PM', 'Design', 'Frontend', 'Backend'].map(function (partName) {
          return (
            <div
              key={partName}
              className={styles.card}
            >
              <h2 className={styles.cardTitle}>{partName}</h2>
              {interviewDates
                .filter(function (date) {
                  const reverseMapping = {
                    PM: 'PM',
                    DESIGN: 'Design',
                    FRONTEND: 'Frontend',
                    BACKEND: 'Backend',
                  };
                  return reverseMapping[date.part] === partName;
                })
                .map(function (date) {
                  return (
                    <div
                      key={date.date}
                      className={styles.dateSection}
                    >
                      <div className={styles.dateTitleWrapper}>
                        <h3 className={styles.dateTitle}>{date.date}</h3>
                        <button
                          className={styles.deleteButton}
                          onClick={function () {
                            handleDeleteDate(partName, date.date);
                          }}
                        >
                          <img
                            src={trash}
                            alt='날짜 삭제'
                            className={styles.deleteIcon}
                          />
                        </button>
                      </div>
                      <div className={styles.timeList}>
                        {interviewTimes
                          .filter(function (time) {
                            return time.part === date.part && time.date === date.date;
                          })
                          .map(function (time) {
                            return (
                              <div
                                key={`${time.startTime}-${time.endTime}`}
                                className={styles.listItem}
                              >
                                <div className={styles.itemContent}>
                                  <div className={styles.mainInfo}>
                                    <span className={styles.timeSlot}>
                                      {formatTime(time.startTime)} - {formatTime(time.endTime)}
                                    </span>
                                    {time.isBooked ? <span className={styles.bookedTag}>예약됨</span> : null}
                                  </div>
                                  {time.isBooked && time.userInfo ? (
                                    <div className={styles.userInfo}>
                                      <span className={styles.userName}>{time.userInfo.name}</span>
                                      <span className={styles.userDetail}>{time.userInfo.department}</span>
                                      <span className={styles.userDetail}>{time.userInfo.phone}</span>
                                    </div>
                                  ) : null}
                                </div>
                                <button
                                  className={styles.deleteButton}
                                  onClick={function () {
                                    handleDeleteTime(partName, date.date, time.startTime, time.endTime);
                                  }}
                                  disabled={time.isBooked}
                                >
                                  <img
                                    src={trash}
                                    alt='시간 삭제'
                                    className={styles.deleteIcon}
                                  />
                                </button>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
