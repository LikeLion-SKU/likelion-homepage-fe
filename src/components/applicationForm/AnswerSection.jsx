import { useStore } from '@store/useStore';
import { useCheckApproach, useGetQuestions } from '@hooks/useApplyHook';
import { useState } from 'react';
import Application from './Application';
import Loading from '../createApply/applicationSection/ui/Loading';

export default function AnswerSection({ step }) {
  const { track, setTrack, setAnswers, questions, setQuestions } = useStore();
  const [userInfo, setUserInfo] = useState([]);
  const [charCounts, setCharCounts] = useState([]); // 글자 수 상태
  const [isAllAnswers, setIsAllAnswers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useCheckApproach(step, track); // 잘못된 사용자 접근 방지
  // 질문 데이터 및 임시저장 데이터 가져오기
  useGetQuestions(
    step,
    track,
    setQuestions,
    setUserInfo,
    setAnswers,
    setCharCounts,
    setTrack,
    setIsAllAnswers,
    setIsLoading,
  );

  if (![1, 2, 3].includes(step)) {
    return null;
  }

  if (isLoading) {
    return (
      <Application>
        <Loading />
      </Application>
    );
  }

  return (
    <Application>
      {step === 3 ? <Application.TrackInfo track={track.label} /> : null}
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
              setIsAllAnswers={setIsAllAnswers}
            />
          ))
        : null}
      <Application.BtnWrapper>
        <Application.PrevBtn step={step} />
        {step !== 3 ? (
          <Application.NextBtn
            step={step}
            isAllAnswers={isAllAnswers}
          />
        ) : (
          <Application.SubmitBtn isAllAnswers={isAllAnswers} />
        )}
      </Application.BtnWrapper>
    </Application>
  );
}
