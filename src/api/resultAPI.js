import { APIService } from './axios';

export async function getDate(config) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_GET_RESULT}/date`;
    const res = await APIService.private.get(baseUrl, config);
    console.log(res);
    return res;
  } catch (error) {
    console.error('답변 일자 호출 실패:', error);
    location.href = '/error';
  }
}

export async function getResult(config) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_GET_RESULT}/passed`;
    const res = await APIService.private.get(baseUrl, config);
    console.log(res);
    return res;
  } catch (error) {
    console.error('답변 일자 호출 실패:', error);
    location.href = '/error';
  }
}
