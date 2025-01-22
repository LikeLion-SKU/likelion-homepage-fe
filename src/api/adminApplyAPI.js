import { APIService } from './axios';

export async function assignPassed(formAnswerId, isPassed, setApplicants, semester, sort) {
  try {
    const baseUrl = import.meta.env.VITE_APP_POST_ANSWER + `/${formAnswerId}/passed`;
    await APIService.private.put(baseUrl, {
      isPassed: isPassed.value,
    });
    getApplicants(setApplicants, semester, sort);
  } catch {
    location.href = '/error';
  }
}

export async function getApplicants(setApplicants, semester, trackType) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_POST_ANSWER}/semester/${semester}`;
    const res = await APIService.private.get(baseUrl, {
      params: {
        trackType,
      },
    });
    setApplicants(res);
  } catch {
    location.href = '/error';
  }
}

export async function getAnswers(studentId) {
  try {
    const baseUrl = studentId
      ? `${import.meta.env.VITE_APP_POST_ANSWER}/semester/${14}/studentId/${studentId}`
      : `${import.meta.env.VITE_APP_POST_ANSWER}/my-submits`;
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
