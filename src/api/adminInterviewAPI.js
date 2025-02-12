import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

// axios 인스턴스 생성 및 기본 설정
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 전체 면접 일정 및 예약자 정보 조회
function getAllUserBookings() {
  return axiosInstance.get('/api/interview/bookings/admin/getalluserbookings');
}

// 예약 삭제
function deleteBooking(timeId) {
  return axiosInstance.delete(`/api/interview/bookings/${timeId}`);
}

export { getAllUserBookings, deleteBooking };
