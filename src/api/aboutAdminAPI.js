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

    return res;
  } catch (error) {
    console.error('수정 실패:', error);
  }
}

export async function putImage(semester, studentId, updatedImage) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_PUT_IMAGE}`;
    const semesterInt = parseInt(semester, 10);
    const params = new URLSearchParams({ semester: semesterInt, studentId });

    const urlWithParams = `${baseUrl}?${params}`;

    const formData = new FormData();
    if (updatedImage) {
      formData.append('file', updatedImage);
    } else {
      formData.append('file', null); // 이미지가 없는 경우 null로 처리 (서버에서 null 처리 필요)
    }

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

    return res;
  } catch (error) {
    console.error('삭제 실패:', error);
  }
}
