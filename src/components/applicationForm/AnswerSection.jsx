import { useNavigate } from 'react-router-dom';
import { useStore } from '@store/useStore';
import { useCheckApproach, useGetQuestions } from '@hooks/useApplyHook';
import { useState } from 'react';
import Application from './Application';

export default function AnswerSection({ step }) {
  const navigate = useNavigate();
  const { track, setTrack, setAnswers, questions, setQuestions } = useStore();
  const [userInfo, setUserInfo] = useState([]);
  const [charCounts, setCharCounts] = useState([]); // 글자 수 상태

  useCheckApproach(step, track); // 잘못된 사용자 접근 방지
  // 질문 데이터 및 임시저장 데이터 가져오기
  useGetQuestions(step, track, setQuestions, setUserInfo, setAnswers, setCharCounts, setTrack, navigate);

  if (![1, 2, 3].includes(step)) {
    return null;
  }

  return (
    <Application>
      {/* 공통 질문 페이지에서만 트랙 선택 */}
      {step === 2 ? <Application.SelectTrack /> : null}
      {questions && questions.length > 0
        ? questions.map((question, index) => (
            <Application.QWrapper
              question={question}
              index={index}
              key={question.id || index}
              step={step}
              userInfo={userInfo}
              charCounts={charCounts}
              setCharCounts={setCharCounts}
            />
          ))
        : null}
      <Application.BtnWrapper>
        <Application.PrevBtn step={step} />
        {step !== 3 ? <Application.NextBtn step={step} /> : <Application.SubmitBtn />}
      </Application.BtnWrapper>
    </Application>
  );
}
