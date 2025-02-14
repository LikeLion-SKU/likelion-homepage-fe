import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkDidApply, formSubmit, getDeadLine, tempSubmit } from '@api/applyAPI';
import { APIService } from '@api/axios';
import { options } from '@constants/applicationForm/formConstants.js';

export function useCheckApproach(step, track) {
  const navigate = useNavigate();

  useEffect(() => {
    if (![1, 2, 3].includes(step) || (step === 3 && (track == null || track === ''))) {
      navigate('/apply?step=1', { replace: true });
    }
  }, [step, track, navigate]);
}

export function areAllQuestionsAnswered(questions, answers) {
  return questions.every((_, index) => answers[index] && answers[index].trim() !== '');
}

export function handleAnswerChange(
  index,
  value,
  MAX_LENGTH,
  answers,
  charCounts,
  setAnswers,
  setCharCounts,
  setIsAllAnswer,
) {
  if (value.length > MAX_LENGTH) return;

  const updatedAnswers = [...answers];
  updatedAnswers[index] = value;
  setAnswers(updatedAnswers);

  const updatedCharCounts = [...charCounts];
  updatedCharCounts[index] = value.length;
  setCharCounts(updatedCharCounts);

  setIsAllAnswer(!updatedAnswers.some((answer) => !answer));
}

export const handleSubmit = async (track, questions, answers, navigate) => {
  const check = await checkDidApply();
  if (!check) {
    navigate('/error', {
      state: {
        msg: '이미 응답한 페이지입니다.',
        msg2: '지원해주셔서 감사합니다.',
        msg3: '설문지는 한번만 작성할 수 있습니다.',
        msg4: '함께 활동하기를 기대하겠습니다.',
        btnMsg: '내 지원서 보러가기',
        url: '/application',
      },
    });
  } else if (check === 'error') {
    navigate('/error');
  }

  if (await isAfterDeadLine()) {
    alert('지원 기간이 종료되었습니다.');
    return;
  }

  if (!areAllQuestionsAnswered(questions, answers)) {
    alert('모든 질문에 답변해주세요.');
    return;
  }
  if (!window.confirm('정말 제출하시겠어요?')) return;
  if (!(await formSubmit(track.value, track.label, questions, answers))) return;
  alert('제출이 완료되었습니다.');
  navigate('/');
  window.scrollTo(0, 0);
};

async function isAfterDeadLine() {
  const deadLine = await getDeadLine();
  const deadLineDate = new Date(`${deadLine}T23:59:59`);
  const now = new Date();

  return now > deadLineDate;
}

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

export function useGetQuestions(
  type,
  track,
  setQuestions,
  setUserInfo,
  setAnswers,
  setCharCounts,
  setTrack,
  setIsAllAnswer,
) {
  const navigate = useNavigate();

  let fetchType;
  if (type === 1) {
    fetchType = null; // fetchType을 명시적으로 null로 설정
  } else if (type === 2) {
    fetchType = 'COMMON';
  } else if (type === 3) {
    fetchType = track.value;
  }

  useEffect(() => {
    if (!fetchType) {
      setQuestions(['이름', '학과', '학번', '전화번호', '이메일']);
    }

    async function fetchQuestions() {
      const token = localStorage.getItem('token');
      if (!token || token === null) {
        navigate('/error', {
          state: {
            msg: '로그인이 필요한 서비스입니다.',
            msg2: '로그인 후 다시 이용해주세요.',
            msg3: '이용에 불편을 드려 죄송합니다.',
            btnMsg: '로그인',
            url: '/login',
          },
        });
        return;
      }

      const check = !fetchType ? await checkDidApply() : 'apply';
      if (!check) {
        navigate('/error', {
          state: {
            msg: '이미 응답한 페이지입니다.',
            msg2: '지원해주셔서 감사합니다.',
            msg3: '설문지는 한번만 작성할 수 있습니다.',
            msg4: '함께 활동하기를 기대하겠습니다.',
            btnMsg: '내 지원서 보러가기',
            url: '/application',
          },
        });
        return;
      } else if (check === 'error') {
        navigate('/error');
        return;
      }

      if (await isAfterDeadLine()) {
        navigate('/error', {
          state: {
            msg: '지원 기간이 종료되었습니다.',
            msg2: '내년에 지원해주시기 바랍니다.',
            btnMsg: '홈으로 돌아가기',
            Url: '/',
          },
        });
        return;
      }

      try {
        if (fetchType) {
          const data = await APIService.private.get(`/api/questions`, {
            params: {
              type: fetchType,
            },
          });
          setQuestions(data);

          const baseUrl = '/api/applications/temp-answers/my-submits';
          const data2 = await APIService.private.get(baseUrl, {
            params: {
              type: fetchType,
            },
          });
          //임시저장 답변이 null일 때, 질문과 답변의 배열 길이를 맞춤
          const tmpAnswer = data2.answers?.map((item) => item.content) || new Array(data.length).fill(undefined);
          setAnswers(tmpAnswer);
          let option = {};
          switch (data2.partType) {
            case 'FRONT_END':
              option = options[0];
              break;
            case 'BACK_END':
              option = options[1];
              break;
            case 'PM':
              option = options[2];
              break;
            case 'DESIGN':
              option = options[3];
          }

          if (data2.partType !== 'NONE' && data2.partType !== null) setTrack(option);

          const updatedCharCounts = tmpAnswer.map((answer) => (answer ? answer.length : 0));
          setCharCounts(updatedCharCounts);

          if (updatedCharCounts.length > 0 && tmpAnswer.every((answer) => answer)) setIsAllAnswer(true);
          else setIsAllAnswer(false);
        } else {
          const baseUrl = import.meta.env.VITE_APP_GET_USERINFO;
          const data = await APIService.private.get(baseUrl);
          const tmp = [data.userName, data.department, data.studentId, data.phoneNumber, data.loginId];
          setUserInfo(tmp);
        }
      } catch {
        navigate('/error');
      }
    }

    fetchQuestions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
}
