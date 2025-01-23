import { APIService } from './axios';

export async function getProfile(semester) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_GET_PROFILE}/${semester}`;
    const res = await APIService.private.get(baseUrl);
    return res.users;
  } catch (error) {
    console.error('API 호출 실패:', error);
    location.href = '/error';
  }
}

export async function putProfile(semester, studentId, updatedData) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_PUT_PROFILE}`;
    const semesterInt = parseInt(semester, 10);
    const params = new URLSearchParams({ semester: semesterInt, studentId });

    const urlWithParams = `${baseUrl}?${params}`;

    const res = await APIService.private.put(urlWithParams, updatedData);

    return res.data;
  } catch (error) {
    console.error('수정 실패:', error);
  }
}
