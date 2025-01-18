import { APIService } from './axios';

export async function assignPassed(formAnswerId, isPassed, setApplicants) {
  try {
    const baseUrl = import.meta.env.VITE_APP_POST_ANSWER + `/${formAnswerId}/passed`;
    await APIService.private.put(baseUrl, {
      isPassed: isPassed.value,
    });
    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant.id === formAnswerId ? { ...applicant, isPassed: isPassed.value } : applicant,
      ),
    );
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

export async function getAnswers(studentId, setAnswers) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_POST_ANSWER}/semester/${14}/studentId${studentId}`;
    const res = await APIService.private.get(baseUrl);
    setAnswers(res);
  } catch {
    location.href = '/error';
  }
}
