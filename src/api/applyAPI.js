import { APIService } from '@api/axios';

export async function tempSubmit(partType, questions, answers) {
  const answer = questions.map((item, index) => ({
    questionId: item.id,
    content: answers[index],
  }));
  try {
    const res = await APIService.private.post(`/api/applications/temp-answers`, {
      partType,
      answers: answer,
    });
    return res;
  } catch {
    return null;
  }
}

export async function formSubmit(partType, partLabel, questions, answers) {
  const answer = questions.map((item, index) => ({
    questionId: item.id,
    content: answers[index],
  }));
  try {
    const semester = new Date().getFullYear() - 2012;
    const baseUrl = '/api/applications/answers';
    const res = await APIService.private.post(baseUrl, {
      part: partLabel,
      semester,
      partType,
      answers: answer,
    });
    return res;
  } catch {
    return null;
  }
}

export async function checkDidApply() {
  try {
    const baseUrl = import.meta.env.VITE_APP_POST_ANSWER + '/my-submits/date';
    const didApply = await APIService.private.get(baseUrl);
    return didApply.createdAt ? false : 'apply';
  } catch {
    return 'error';
  }
}

export async function getDeadLine() {
  try {
    const baseUrl = `/api/applications/forms`;
    const deadLine = await APIService.public.get(baseUrl);
    return deadLine;
  } catch {
    location.href = '/error';
  }
}
