// InterviewAdmin.jsx
import { useState, useEffect } from 'react';
import styles from './InterviewAdmin.module.css';
import FormBody from '@components/adminApply/FormBody';
import { getAllUserBookings, deleteBooking, getUserApplication } from '@api/adminInterviewAPI';

export default function InterviewAdmin() {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedPart, setSelectedPart] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationData, setApplicationData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setError(null);

    getAllUserBookings()
      .then((response) => {
        Array.isArray(response.data) ? setBookings(response.data) : setError('데이터 형식이 올바르지 않습니다.');
      })
      .catch(() => {
        setError('데이터를 불러오는데 실패했습니다.');
      });
  };

  const handleDeleteBooking = (timeId) => {
    window.confirm('예약을 삭제하시겠습니까?') &&
      deleteBooking(timeId)
        .then(() => {
          fetchBookings();
          alert('삭제 되었습니다');
        })
        .catch(() => {
          setError('예약 삭제에 실패했습니다.');
        });
  };

  const handleViewApplication = (loginId) => {
    if (!loginId) {
      alert('지원자 정보가 없습니다.');
      return;
    }

    getUserApplication(loginId)
      .then((response) => {
        setApplicationData(response.data);
        setIsModalOpen(true);
      })
      .catch(() => {
        setError('지원서를 불러오는데 실패했습니다.');
      });
  };

  // Modal 컴포넌트
  function ApplicationModal({ isModalOpen, onClose, applicationData }) {
    if (!isModalOpen || !applicationData) return null;

    return (
      <div
        className={styles.modalOverlay}
        onClick={onClose}
      >
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()} // 이벤트 전파 중단
        >
          <h1 className={styles.title}>지원서</h1>
          <button
            className={styles.closeButton}
            onClick={onClose}
          >
            ✕
          </button>
          <FormBody
            id={applicationData.applicationFormAnswer.id}
            userInfos={applicationData.userInfo}
          />
        </div>
      </div>
    );
  }

  const getUniqueDates = () => [...new Set(bookings.map((booking) => booking.date))].sort();

  const getUniqueParts = () => [...new Set(bookings.map((booking) => booking.part))];

  const getTimeSlots = (date, part) =>
    [
      ...new Set(
        bookings
          .filter((booking) => booking.date === date && booking.part === part)
          .map((booking) => `${booking.startTime.slice(0, 5)} - ${booking.endTime.slice(0, 5)}`),
      ),
    ].sort();

  const getBookedUsers = (date, part) => {
    const bookedUsers = new Set();
    bookings
      .filter((booking) => booking.date === date && booking.part === part && booking.booked)
      .forEach((booking) => {
        if (booking.userName) {
          bookedUsers.add(
            JSON.stringify({
              name: booking.userName,
              department: booking.department,
              studentId: booking.studentId,
              phoneNumber: booking.phoneNumber,
              loginId: booking.loginId,
            }),
          );
        }
      });
    return Array.from(bookedUsers).map((user) => JSON.parse(user));
  };

  const getBookingForSlot = (date, timeSlot, userName, part) => {
    const [startTime, endTime] = timeSlot.split(' - ').map((time) => `${time}:00`);
    return bookings.find(
      (booking) =>
        booking.date === date &&
        booking.startTime === startTime &&
        booking.endTime === endTime &&
        booking.userName === userName &&
        booking.part === part,
    );
  };

  const getFilteredParts = () => (selectedPart === 'all' ? getUniqueParts() : [selectedPart]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>면접 일정 관리</h1>

      {error ? <div className={styles.error}>{error}</div> : null}

      <div className={styles.filters}>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className={styles.select}
        >
          <option value='all'>전체 날짜</option>
          {getUniqueDates().map((date) => (
            <option
              key={date}
              value={date}
            >
              {date}
            </option>
          ))}
        </select>

        <select
          value={selectedPart}
          onChange={(e) => setSelectedPart(e.target.value)}
          className={styles.select}
        >
          <option value='all'>전체 파트</option>
          {getUniqueParts().map((part) => (
            <option
              key={part}
              value={part}
            >
              {part}
            </option>
          ))}
        </select>
      </div>

      {(selectedDate === 'all' ? getUniqueDates() : [selectedDate]).map((date) => (
        <div
          key={date}
          className={styles.dateSection}
        >
          {getFilteredParts().map((part) => (
            <div
              key={`${date}-${part}`}
              className={styles.partSection}
            >
              <h2
                className={styles.partTitle}
                data-part={part}
              >
                {part} - {date}
              </h2>
              <div className={styles.scheduleTable}>
                <table>
                  <thead>
                    <tr>
                      <th className={styles.userInfoHeader}>지원자 정보</th>
                      {getTimeSlots(date, part).map((timeSlot) => (
                        <th
                          key={timeSlot}
                          className={styles.timeSlotHeader}
                        >
                          <div className={styles.timeSlot}>{timeSlot}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {getBookedUsers(date, part).map((user) => (
                      <tr key={`${user.name}-${user.studentId}`}>
                        <td className={styles.userInfo}>
                          <div className={styles.userName}>{user.name}</div>
                          <div className={styles.userDetails}>
                            <div>{user.department}</div>
                            <div>{user.studentId}</div>
                            <div>{user.phoneNumber}</div>
                            <button
                              onClick={() => handleViewApplication(user.loginId)}
                              className={styles.viewApplicationButton}
                            >
                              지원서 보기
                            </button>
                          </div>
                        </td>
                        {getTimeSlots(date, part).map((timeSlot) => {
                          const booking = getBookingForSlot(date, timeSlot, user.name, part);
                          return (
                            <td
                              key={timeSlot}
                              className={styles.bookingCell}
                            >
                              {booking ? (
                                <div
                                  className={styles.bookedSlot}
                                  data-part={part}
                                >
                                  <button
                                    onClick={() => handleDeleteBooking(booking.bookingId)}
                                    className={styles.deleteButton}
                                  >
                                    면접일정
                                    <br />
                                    강제삭제
                                  </button>
                                </div>
                              ) : (
                                <div className={styles.emptySlot}>-</div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ))}
      <ApplicationModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        applicationData={applicationData}
      />
    </div>
  );
}
