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

export async function getAnswers(id) {
  try {
    const baseUrl = id ? `/api/admin/applications/answers/${id}` : `${import.meta.env.VITE_APP_POST_ANSWER}/my-submits`;
    const res = await APIService.private.get(baseUrl);
    return res;
  } catch {
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
