import { APIService } from '@api/axios';
import { options } from '@constants/applicationForm/formConstants';
import { useEffect } from 'react';

export function useGetQuestions(type, track, setQuestions, setUserInfo, setAnswers, setCharCounts, setTrack, navigate) {
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
      const check = await checkDidApply();
      if (!check) {
        navigate('/error', {
          state: {
            msg: '이미 응답한 페이지입니다.',
            msg2: '지원해주셔서 감사합니다.',
            msg3: '설문지는 한번만 작성할 수 있습니다.',
            msg4: '함께 활동하기를 기대하겠습니다.',
            btnMsg: '내 지원서 보러가기',
            url: '/',
          },
        });
      } else if (check === 'error') {
        navigate('/error');
      }
      try {
        if (fetchType) {
          const baseUrl = import.meta.env.VITE_APP_GET_QUESTION;
          const data = await APIService.private.get(`${baseUrl}/${14}/type/${fetchType}`);
          setQuestions(data);

          try {
            const baseUrl2 = import.meta.env.VITE_APP_POST_ANSWER;
            const data2 = await APIService.private.get(`${baseUrl2}/temps/type/${fetchType}`);
            const tmpAnswer = data2.answers.map((item) => item.content);
            setAnswers(tmpAnswer);
            let option = {};
            switch (data2.trackType) {
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
            if (data2.trackType !== 'NONE') setTrack(option);
            if (tmpAnswer.length > 0) {
              const updatedCharCounts = tmpAnswer.map((answer) => (answer ? answer.length : 0));
              setCharCounts(updatedCharCounts);
            }
          } catch {
            console.log('임시저장 내용 없음');
          }
        } else {
          const baseUrl = import.meta.env.VITE_APP_GET_USERINFO;
          const data = await APIService.private.get(baseUrl);
          const tmp = [data.userName, data.department, data.studentId, data.phoneNumber, data.loginID];
          setUserInfo(tmp);
        }
      } catch (error) {
        console.error(error);
        navigate('/error');
      }
    }

    fetchQuestions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, track]);
}

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
  } catch (error) {
    console.error(error);
    alert(error);
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
  } catch (error) {
    console.log(error);
    alert(error);
    return null;
  }
}

export async function checkDidApply() {
  try {
    const baseUrl = import.meta.env.VITE_APP_POST_ANSWER + '/my-submit-time';
    const didApply = await APIService.private.get(baseUrl);
    return didApply.createdAt ? false : 'apply';
  } catch {
    return 'error';
  }
}
