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
      console.log(updatedImage);
    } else {
      formData.append('file', null);
      console.log('null이다!');
    }

    for (let key of formData.keys()) {
      console.log(key);
    }

    // FormData의 value 확인
    for (let value of formData.values()) {
      console.log(value);
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
