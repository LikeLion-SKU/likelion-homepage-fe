import { APIService } from './axios';

export async function getProfile(semester) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_GET_PROFILE}/${semester}`; // semester 값 포함
    const res = await APIService.private.get(baseUrl);
    console.log('API 데이터:', res.users);
    return res.users;
  } catch (error) {
    console.error('API 호출 실패:', error);
    location.href = '/error';
  }
}
