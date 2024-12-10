import styles from '@components/applicationForm/AnswerSection.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useStore } from '../../store/useStore';
import {
  options,
  questions,
  style,
} from '../../constants/applicationForm/formConstants';
import { useEffect } from 'react';

export default function AnswerSection({ step }) {
  const navigate = useNavigate();
  const { track, setTrack } = useStore();

  useEffect(() => {
    if (![1, 2, 3].includes(step) || (step === 3 && !track)) {
      console.log('잘못된 접근입니다.');
      navigate('/apply?step=1', { replace: true });
    }
  }, [step, navigate, track]);

  if (![1, 2, 3].includes(step)) {
    return null;
  }

  return (
    <div className={styles.sectionWrapper}>
      {step === 2 && (
        <div className={styles.trackWrapper}>
          <label>지원 트랙</label>
          <Select
            styles={style}
            options={options}
            value={track}
            onChange={setTrack}
            placeholder="선택해주세요"
          />
        </div>
      )}
      {questions[step - 1].map((question, index) => (
        <div key={index} className={styles.question}>
          <div className={styles.questionName}>
            <span>{question}</span>
          </div>
          {step !== 1 ? (
            <div className={styles.inputWrapper}>
              <textarea placeholder="답변을 입력해주세요" />
            </div>
          ) : (
            <div className={styles.userInfo}>
              <span>김예찬</span>
            </div>
          )}
        </div>
      ))}
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
          <button
            onClick={() => {
              if (step === 2 && !track) {
                alert('지원하실 트랙을 선택해주세요.');
                return;
              }
              navigate(`/apply?step=${step + 1}`);
              window.scrollTo(0, 0);
            }}
          >
            다음
          </button>
        ) : (
          <button className={styles.submitBtn}>제출하기</button>
        )}
      </div>
    </div>
  );
}

AnswerSection.propTypes = {
  step: PropTypes.number,
  setClickStep: PropTypes.func,
};
