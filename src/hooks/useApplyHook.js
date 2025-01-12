import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { formSubmit, tempSubmit } from '@api/applyAPI';

export function useCheckApproach(step, track) {
  const navigate = useNavigate();

  useEffect(() => {
    if (![1, 2, 3].includes(step) || (step === 3 && (track == null || track === ''))) {
      console.log('잘못된 접근입니다.');
      navigate('/apply?step=1', { replace: true });
    }
  }, [step, track, navigate]);
}

export function areAllQuestionsAnswered(questions, answers) {
  return questions.every((_, index) => answers[index] && answers[index].trim() !== '');
}

export function handleAnswerChange(index, value, MAX_LENGTH, answers, charCounts, setAnswers, setCharCounts) {
  if (value.length > MAX_LENGTH) return;

  const updatedAnswers = [...answers];
  updatedAnswers[index] = value;
  setAnswers(updatedAnswers);

  const updatedCharCounts = [...charCounts];
  updatedCharCounts[index] = value.length;
  setCharCounts(updatedCharCounts);
}

export const handleSubmit = async (track, questions, answers, navigate) => {
  if (!areAllQuestionsAnswered(questions, answers)) {
    alert('모든 질문에 답변해주세요.');
    return;
  }
  if (!(await formSubmit(track.value, questions, answers))) return;
  alert('제출이 완료되었습니다.');
  navigate('/');
  window.scrollTo(0, 0);
};

export async function handleNextPage(step, track, questions, answers, setAnswers, navigate) {
  if (step === 2 && !track) {
    alert('지원하실 트랙을 선택해주세요.');
    return;
  }
  if (step !== 1 && !areAllQuestionsAnswered(questions, answers)) {
    alert('모든 질문에 답변해주세요.');
    return;
  }
  if (step === 2) {
    if (!(await tempSubmit(track.value, questions, answers))) return;
  }
  setAnswers([]);
  navigate(`/apply?step=${step + 1}`);
  window.scrollTo(0, 0);
}

export async function handleTmpRes(answers, answersId, trackType) {
  if (!trackType) {
    await tempSubmit('NONE', answersId, answers);
  } else await tempSubmit(trackType, answersId, answers);

  alert('임시저장이 완료되었습니다.');
}
