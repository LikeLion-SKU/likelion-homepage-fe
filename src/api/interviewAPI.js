import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

// axios 인스턴스 생성 및 기본 설정
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  function (config) {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem('token');

    // 토큰이 있으면 헤더에 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

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
function getUserPart() {
  return axiosInstance.get('/api/users/parts');
}

/**
 * 면접 날짜를 등록하는 함수
 * @param {string} part - 면접 파트 (PM, Design, Frontend, Backend)
 * @param {string} date - 면접 날짜 (YYYY-MM-DD 형식)
 * @returns {Promise} - API 응답
 */
function registerInterviewDate(part, date) {
  // 파트 이름을 서버 형식에 맞게 변환
  const transformedData = {
    part: PART_MAPPING[part],
    date: date,
  };

  return axiosInstance.post('/api/interview/dates', transformedData);
}

/**
 * 면접 시간을 등록하는 함수
 * @param {Object} timeData - 면접 시간 데이터
 * @returns {Promise} - API 응답
 */
function registerInterviewTime(timeData) {
  // 서버 형식에 맞게 데이터 변환
  const transformedData = {
    part: PART_MAPPING[timeData.part],
    date: timeData.date,
    startTime: timeData.startTime,
    endTime: timeData.endTime,
  };
  return axiosInstance.post('/api/interview/times', transformedData);
}

function getInterviewDates() {
  return axiosInstance.get('/api/interview/dates');
}

/**
 * 면접 날짜와 해당 날짜의 모든 시간을 삭제하는 함수
 * @param {string} part - 면접 파트
 * @param {string} date - 면접 날짜
 * @returns {Promise} - API 응답
 */
function deleteInterviewDate(part, date) {
  const transformedPart = PART_MAPPING[part];
  return axiosInstance.delete(`/api/interview/dates/part/${transformedPart}/date/${date}`);
}

function getInterviewTimes() {
  return axiosInstance.get('/api/interview/times');
}

/**
 * 면접 시간을 삭제하는 함수
 * @param {string} part - 면접 파트
 * @param {string} date - 면접 날짜
 * @param {string} startTime - 시작 시간
 * @param {string} endTime - 종료 시간
 * @returns {Promise} - API 응답
 */
function deleteInterviewTime(part, date, startTime, endTime) {
  const transformedPart = PART_MAPPING[part];
  const queryParams = `startTime=${startTime}&endTime=${endTime}`;

  return axiosInstance.delete(`/api/interview/times/part/${transformedPart}/date/${date}/time?${queryParams}`);
}

// 면접 시간 예약 함수 추가
function bookInterview(bookingData) {
  return axiosInstance.post('/api/interview/bookings', bookingData);
}

export {
  registerInterviewDate,
  getInterviewDates,
  deleteInterviewDate,
  getInterviewTimes,
  registerInterviewTime,
  deleteInterviewTime,
  getUserPart,
  bookInterview,
};
