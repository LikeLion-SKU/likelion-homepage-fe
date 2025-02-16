import { APIService } from '@api/axios';

/**
 * 면접 파트 Enum 매핑
 * 서버의 Enum 형식에 맞게 변환
 */
const PART_MAPPING = {
  PM: 'PM',
  Design: 'DESIGN',
  Frontend: 'FRONTEND',
  Backend: 'BACKEND',
};

/**
 * 사용자의 파트 정보를 가져오는 함수
 * @returns {Promise} - API 응답
 */
export async function getUserPart() {
  return await APIService.private.get('/api/users/parts');
}

/**
 * 면접 날짜를 등록하는 함수
 * @param {string} part - 면접 파트 (PM, Design, Frontend, Backend)
 * @param {string} date - 면접 날짜 (YYYY-MM-DD 형식)
 * @returns {Promise} - API 응답
 */
export async function registerInterviewDate(part, date) {
  const transformedData = {
    part: PART_MAPPING[part],
    date: date,
  };
  return await APIService.private.post('/api/interview/dates', transformedData);
}

/**
 * 면접 시간을 등록하는 함수
 * @param {Object} timeData - 면접 시간 데이터
 * @returns {Promise} - API 응답
 */
export async function registerInterviewTime(timeData) {
  // 서버 형식에 맞게 데이터 변환
  const transformedData = {
    part: PART_MAPPING[timeData.part],
    date: timeData.date,
    startTime: timeData.startTime,
    endTime: timeData.endTime,
  };
  return await APIService.private.post('/api/interview/times', transformedData);
}

/**
 * 면접 날짜 목록을 가져오는 함수
 * @returns {Promise} - API 응답
 */
export async function getInterviewDates() {
  return await APIService.private.get('/api/interview/dates');
}

/**
 * 면접 날짜와 해당 날짜의 모든 시간을 삭제하는 함수
 * @param {string} part - 면접 파트
 * @param {string} date - 면접 날짜
 * @returns {Promise} - API 응답
 */
export async function deleteInterviewDate(part, date) {
  const transformedPart = PART_MAPPING[part];
  return await APIService.private.delete(`/api/interview/dates/part/${transformedPart}/date/${date}`);
}

/**
 * 면접 시간 목록을 가져오는 함수
 * @returns {Promise} - API 응답
 */
export async function getInterviewTimes() {
  return await APIService.private.get('/api/interview/times');
}

/**
 * 면접 시간을 삭제하는 함수
 * @param {string} part - 면접 파트
 * @param {string} date - 면접 날짜
 * @param {string} startTime - 시작 시간
 * @param {string} endTime - 종료 시간
 * @returns {Promise} - API 응답
 */
export async function deleteInterviewTime(part, date, startTime, endTime) {
  const transformedPart = PART_MAPPING[part];
  const queryParams = `startTime=${startTime}&endTime=${endTime}`;

  return await APIService.private.delete(
    `/api/interview/times/part/${transformedPart}/date/${date}/time?${queryParams}`,
  );
}

/**
 * 면접 시간 예약 함수
 * @param {Object} bookingData - 예약 데이터
 * @returns {Promise} - API 응답
 */
export async function bookInterview(bookingData) {
  return await APIService.private.post('/api/interview/bookings', bookingData);
}

/**
 * 내 면접 일정을 조회하는 함수
 * @returns {Promise} - API 응답
 */
export async function getMyInterviewSchedule() {
  return await APIService.private.get('/api/interview/bookings/my');
}

/**
 * 면접 예약을 취소하는 함수
 * @param {string} bookingId - 예약 ID
 * @returns {Promise} - API 응답
 */
export async function deleteInterviewBooking(bookingId) {
  return await APIService.private.delete(`/api/interview/bookings/${bookingId}`);
}
