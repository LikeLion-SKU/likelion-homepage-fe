import { APIService } from './axios';

export async function assignPassed(formAnswerId, isPassed, setApplicants, semester) {
  try {
    const baseUrl = import.meta.env.VITE_APP_POST_ANSWER + `/${formAnswerId}/passed`;
    await APIService.private.put(baseUrl, {
      isPassed: isPassed.value,
    });
    getApplicants(setApplicants, semester);
  } catch {
    location.href = '/error';
  }
}

export async function getApplicants(setApplicants, semester) {
  try {
    const baseUrl = import.meta.env.VITE_APP_POST_ANSWER;
    const res = await APIService.private.get(`${baseUrl}/semester/${semester}`);
    setApplicants(res);
  } catch {
    location.href = '/error';
  }
}

export async function getAnswers(studentId) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_POST_ANSWER}/semester/${14}/studentId/${studentId}`;
    const res = await APIService.private.get(baseUrl);
    return res;
  } catch {
    location.href = '/error';
  }
}

export async function getUserInfos(studentId) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_ADMIN_USER}/details/student-id/${studentId}`;
    const res = await APIService.private.get(baseUrl);
    return res;
  } catch {
    location.href = '/error';
  }
}
