import { APIService } from './axios';

export async function getDate(config) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_GET_RESULT}/date`;
    const res = await APIService.private.get(baseUrl, config);
    return res;
  } catch {
    location.href = '/error';
  }
}

export async function getResult(config) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_GET_RESULT}/passed`;
    const res = await APIService.private.get(baseUrl, config);
    return res;
  } catch {
    location.href = '/error';
  }
}

export async function getResultOnMyPage(config) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_GET_RESULT}/passed`;
    const response = await APIService.private.get(baseUrl, config);
    return response;
  } catch (error) {
    if (error.response?.status === 400) {
      return {
        isPassed: false,
      };
    }
    // 다른 에러의 경우는 그대로 throw
    throw error;
  }
}
