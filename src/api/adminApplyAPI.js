import { APIService } from './axios';

export async function assignPassed(formAnswerId, isPassed, setApplicants, semester, sort) {
  try {
    const baseUrl = `/api/admin/applications/answers/${formAnswerId}/passed`;
    await APIService.private.put(baseUrl, {
      isPassed: isPassed.value,
    });
    getApplicants(setApplicants, semester, sort);
  } catch {
    location.href = '/error';
  }
}

export async function getApplicants(setApplicants, semester, part) {
  try {
    const baseUrl = `/api/admin/applications/answers`;
    const res = await APIService.private.get(baseUrl, {
      params: {
        semester,
        part,
      },
    });
    setApplicants(res);
  } catch {
    location.href = '/error';
  }
}

export async function getAnswers(id, navigate) {
  try {
    const baseUrl = id ? `/api/admin/applications/answers/${id}` : `${import.meta.env.VITE_APP_POST_ANSWER}/my-submits`;
    const res = await APIService.private.get(baseUrl);
    return res;
  } catch (error) {
    const status = error.response?.status || error.status;
    if (status === 404) {
      navigate('/error', {
        state: {
          msg: '제출된 지원서가 없습니다.',
          msg2: '지원서를 작성해주세요.',
          msg3: '함께 활동하기를 기대하겠습니다.',
          btnMsg: '지원하러 가기',
          url: '/apply',
        },
      });
      return;
    }
    location.href = '/error';
  }
}

export async function getUserInfos(studentId) {
  try {
    const baseUrl = studentId
      ? `${import.meta.env.VITE_APP_ADMIN_USER}/details/student-id/${studentId}`
      : `${import.meta.env.VITE_APP_GET_USERINFO}`;
    const res = await APIService.private.get(baseUrl);
    return res;
  } catch {
    location.href = '/error';
  }
}

export async function getSemesters() {
  try {
    const baseUrl = '/api/admin/applications/forms';
    const res = await APIService.private.get(baseUrl);
    const data = res.sort((a, b) => a.semester - b.semester).map((item) => item.semester);
    return data;
  } catch {
    location.href = '/error';
  }
}
