import styles from '@components/applicationForm/AnswerSection.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useStore } from '@store/useStore';
import { options, style } from '@constants/applicationForm/formConstants';
import {
  handleAnswerChange,
  handleNextPage,
  handleSubmit,
  useCheckApproach,
  useGetQuestions,
} from '@hooks/useApplyHook';
import { useState } from 'react';

export default function AnswerSection({ step }) {
  const navigate = useNavigate();
  const { track, setTrack, answers, setAnswers, questions, setQuestions } = useStore();
  const [userInfo, setUserInfo] = useState([]);
  const [charCounts, setCharCounts] = useState([]); // 글자 수 상태
  const MAX_LENGTH = 500; // 글자 수 제한

  useCheckApproach(step, track); // 잘못된 사용자 접근 방지
  // 질문 데이터 및 임시저장 데이터 가져오기
  useGetQuestions(step, track, setQuestions, setUserInfo, setAnswers, setCharCounts, setTrack, navigate);

  if (![1, 2, 3].includes(step)) {
    return null;
  }

  return (
    <div className={styles.sectionWrapper}>
      {step === 2 ? (
        <div className={styles.trackWrapper}>
          <label>지원 트랙</label>
          <Select
            styles={style}
            options={options}
            value={track}
            onChange={(selectedOption) => setTrack(selectedOption)}
            placeholder='선택해주세요'
            isSearchable={false}
          />
        </div>
      ) : null}
      {questions && questions.length > 0
        ? questions.map((question, index) => (
            <div
              key={question.id || index}
              className={styles.question}
            >
              <div className={styles.questionName}>
                <span>{question.id ? index + 1 + '. ' + question.content : question}</span>
              </div>
              {step !== 1 ? (
                <div className={styles.inputWrapper}>
                  <textarea
                    placeholder='답변을 입력해주세요'
                    value={answers[index] || ''}
                    onChange={(e) =>
                      handleAnswerChange(
                        index,
                        e.target.value,
                        MAX_LENGTH,
                        answers,
                        charCounts,
                        setAnswers,
                        setCharCounts,
                      )
                    }
                  />
                  <div className={styles.charCount}>
                    <span>
                      {charCounts[index] || 0} / {MAX_LENGTH}자
                    </span>
                  </div>
                </div>
              ) : (
                <div className={styles.userInfo}>
                  <span>{userInfo[index]}</span>
                </div>
              )}
            </div>
          ))
        : null}
      <div className={styles.buttonWrapper}>
        <button
          style={step === 1 ? { visibility: 'hidden' } : null}
          onClick={() => {
            navigate(`/apply?step=${step - 1}`);
            window.scrollTo(0, 0);
          }}
        >
          이전
        </button>
        {step !== 3 ? (
          <button onClick={() => handleNextPage(step, track, questions, answers, setAnswers, navigate)}>다음</button>
        ) : (
          <button
            onClick={() => handleSubmit(track, questions, answers, navigate)}
            className={styles.submitBtn}
          >
            제출하기
          </button>
        )}
      </div>
    </div>
  );
}

AnswerSection.propTypes = {
  step: PropTypes.number,
  setClickStep: PropTypes.func,
};
