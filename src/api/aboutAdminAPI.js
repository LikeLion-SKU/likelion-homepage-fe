import { APIService } from './axios';

export async function getProfile(semester) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_GET_PROFILE}/${semester}`;
    const res = await APIService.private.get(baseUrl);
    return res.users;
  } catch (error) {
    console.error('API 호출 실패:', error);
  }
}

export async function putProfile(semester, studentId, updatedData) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_PUT_PROFILE}`;
    const semesterInt = parseInt(semester, 10);
    const params = new URLSearchParams({ semester: semesterInt, studentId });

    const urlWithParams = `${baseUrl}?${params}`;

    const res = await APIService.private.put(urlWithParams, updatedData);

    return res;
  } catch (error) {
    let errorMessage = '프로필 수정에 실패했습니다.';

    if (error.response && error.response.status === 500) {
      errorMessage = '학번이 고유하지 않습니다.';
    }

    alert(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function putImage(semester, studentId, formData) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_PUT_IMAGE}`;
    const semesterInt = parseInt(semester, 10);
    const params = new URLSearchParams({ semester: semesterInt, studentId });

    const urlWithParams = `${baseUrl}?${params}`;

    const res = await APIService.private.put(urlWithParams, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // multipart/form-data 설정
      },
    });

    return res;
  } catch (error) {
    console.error('수정 실패:', error);
  }
}

export async function deleteProfile(semester, studentId) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_DELETE_PROFILE}`;
    const semesterInt = parseInt(semester, 10);
    const params = new URLSearchParams({ semester: semesterInt, studentId });

    const urlWithParams = `${baseUrl}?${params}`;

    const res = await APIService.private.delete(urlWithParams);

    return res.success;
  } catch (error) {
    console.error('삭제 실패:', error);
  }
}
