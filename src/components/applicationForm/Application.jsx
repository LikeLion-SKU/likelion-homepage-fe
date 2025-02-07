import Select from 'react-select';
import styles from './Application.module.css';
import { options, style } from '@constants/applicationForm/formConstants';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';
import { handleAnswerChange, handleNextPage, handleSubmit } from '@/hooks/useApplyHook';
const MAX_LENGTH = 500;

export default function Application({ children }) {
  return <div className={styles.sectionWrapper}>{children}</div>;
}

function SelectTrack() {
  const { track, setTrack } = useStore();

  return (
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
  );
}

function TrackInfo({ track }) {
  return <div className={styles.trackInfo}>{track} 트랙 질문입니다.</div>;
}

function ApplicantInfo({ userInfo }) {
  return (
    <div className={styles.userInfo}>
      <span>{userInfo}</span>
    </div>
  );
}

function QWrapper({ question, index, charCounts, setCharCounts, step, userInfo }) {
  return (
    <div
      key={question.id || index}
      className={styles.question}
    >
      <Question
        index={index}
        question={question}
      />
      {step !== 1 ? (
        <AnswerWrapper
          index={index}
          charCounts={charCounts}
          setCharCounts={setCharCounts}
        />
      ) : (
        <ApplicantInfo userInfo={userInfo[index]} />
      )}
    </div>
  );
}

function AnswerWrapper({ index, charCounts, setCharCounts }) {
  const { answers, setAnswers } = useStore();

  return (
    <div className={styles.inputWrapper}>
      <textarea
        placeholder='답변을 입력해주세요'
        value={answers[index] || ''}
        onChange={(e) =>
          handleAnswerChange(index, e.target.value, MAX_LENGTH, answers, charCounts, setAnswers, setCharCounts)
        }
      />
      <div className={styles.charCount}>
        <span>
          {charCounts[index] || 0} / {MAX_LENGTH}자
        </span>
      </div>
    </div>
  );
}

function Question({ question, index }) {
  return (
    <div className={styles.questionName}>
      <span>{question.id ? index + 1 + '. ' + question.content : question}</span>
    </div>
  );
}

function BtnWrapper({ children }) {
  return <div className={styles.buttonWrapper}>{children}</div>;
}

function PrevBtn({ step }) {
  const navigate = useNavigate();

  return (
    <button
      style={step === 1 ? { visibility: 'hidden' } : null}
      onClick={() => {
        navigate(`/apply?step=${step - 1}`);
        window.scrollTo(0, 0);
      }}
    >
      이전
    </button>
  );
}

function NextBtn({ step }) {
  const { track, questions, answers, setAnswers } = useStore();
  const navigate = useNavigate();

  return <button onClick={() => handleNextPage(step, track, questions, answers, setAnswers, navigate)}>다음</button>;
}

function SubmitBtn() {
  const { track, questions, answers } = useStore();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => handleSubmit(track, questions, answers, navigate)}
      className={styles.submitBtn}
    >
      제출하기
    </button>
  );
}

Application.SelectTrack = SelectTrack;
Application.TrackInfo = TrackInfo;
Application.ApplicantInfo = ApplicantInfo;
Application.QWrapper = QWrapper;
Application.BtnWrapper = BtnWrapper;
Application.PrevBtn = PrevBtn;
Application.NextBtn = NextBtn;
Application.SubmitBtn = SubmitBtn;
