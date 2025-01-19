import { APIService } from '@api/axios';

export async function tempSubmit(trackType, questions, answers) {
  const answer = questions.map((item, index) => ({
    questionId: item.id,
    content: answers[index],
  }));
  try {
    const res = await APIService.private.post(`${import.meta.env.VITE_APP_POST_ANSWER}/temps`, {
      trackType,
      answers: answer,
    });
    return res;
  } catch {
    return null;
  }
}

export async function formSubmit(trackType, questions, answers) {
  const answer = questions.map((item, index) => ({
    questionId: item.id,
    content: answers[index],
  }));
  try {
    const res = await APIService.private.post(import.meta.env.VITE_APP_POST_ANSWER, {
      trackType,
      answers: answer,
    });
    return res;
  } catch {
    return null;
  }
}

export async function checkDidApply() {
  try {
    const baseUrl = import.meta.env.VITE_APP_POST_ANSWER + '/my-submits/time';
    const didApply = await APIService.private.get(baseUrl);
    return didApply.createdAt ? false : 'apply';
  } catch {
    return 'error';
  }
}
