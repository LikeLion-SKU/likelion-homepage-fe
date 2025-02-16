import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIService } from '@api/axios';
import styles from './Recruit.module.css';
import ParallaxText from './ParallaxText/ParallaxText';
import arrow from '@assets/homepage/arrow.webp';
import { PulseLoader } from 'react-spinners';
const RecruitContext = createContext();

export default function Recruit({ children }) {
  const [targetDate, setTargetDate] = useState(null);
  const [resultDate, setResultDate] = useState(null);
  const [targetSemester, setTargetSemester] = useState(null);
  const [isRecruiting, setIsRecruiting] = useState(true);

  useEffect(() => {
    async function fetchTargetDate() {
      try {
        const baseUrl = import.meta.env.VITE_APP_GET_SCHEDULE;
        const response = await APIService.public.get(baseUrl, {
          params: {
            isActive: true,
          },
        });
        setTargetDate(new Date(response.deadline));
        setResultDate(new Date(response.resultDate));
        setTargetSemester(response.semester);
        setIsRecruiting(new Date() < new Date(response.deadline));
      } catch {
        location.href = '/error';
      }
    }
    fetchTargetDate();
  }, []);

  return (
    <RecruitContext.Provider value={{ targetDate, resultDate, targetSemester, isRecruiting }}>
      <section className={styles.section}>{children}</section>
    </RecruitContext.Provider>
  );
}

function useRecruitContext() {
  return useContext(RecruitContext);
}

function RecruitItemBox({ children }) {
  return <div className={styles.itemBox}>{children}</div>;
}

function RecruitTitle() {
  const { targetSemester, isRecruiting } = useRecruitContext();
  if (targetSemester === null) {
    return <PulseLoader color='#36D7B7' />;
  }

  return (
    <p className={styles.title}>
      {isRecruiting ? (
        `${targetSemester}기 아기사자 모집`
      ) : (
        <>
          {targetSemester}기 아기사자
          <br />
          서류 합격 발표
        </>
      )}
    </p>
  );
}

function RecruitTimerTitle() {
  return (
    <div className={styles.timertitle}>
      <span>DAYS</span>
      <span>HOURS</span>
      <span>MINUTES</span>
      <span>SECONDS</span>
    </div>
  );
}

function RecruitTimer() {
  const { targetDate, resultDate, isRecruiting } = useRecruitContext();
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
  const target = isRecruiting ? targetDate : resultDate;

  useEffect(() => {
    if (!target) return;

    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(intervalId);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, '0');
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
          .toString()
          .padStart(2, '0');
        const minutes = Math.floor((difference / (1000 * 60)) % 60)
          .toString()
          .padStart(2, '0');
        const seconds = Math.floor((difference / 1000) % 60)
          .toString()
          .padStart(2, '0');

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [target]);

  return (
    <div className={styles.timer}>
      <span>{timeLeft.days}</span>
      <span>:</span>
      <span>{timeLeft.hours}</span>
      <span>:</span>
      <span>{timeLeft.minutes}</span>
      <span>:</span>
      <span>{timeLeft.seconds}</span>
    </div>
  );
}

function RecruitButton() {
  const { resultDate, isRecruiting } = useRecruitContext();
  const navigate = useNavigate();
  const now = new Date();
  const isResultTime = resultDate ? now >= resultDate : false;
  const isDisabled = !isRecruiting && !isResultTime;

  return (
    <button
      className={styles.button}
      onClick={() => navigate('recruit')}
      disabled={isDisabled}
    >
      {isRecruiting ? '지원하러 가기' : isResultTime ? '결과 보러 가기' : '결과 산정 중'}
      <img
        src={arrow}
        alt='arrow'
      />
    </button>
  );
}

function RecruitMotion() {
  return (
    <>
      <ParallaxText baseVelocity={-3}>LIKELION SKU LIKELION SKU</ParallaxText>
      <ParallaxText baseVelocity={4}>GROWL TO WORLD</ParallaxText>
    </>
  );
}

Recruit.ItemBox = RecruitItemBox;
Recruit.Title = RecruitTitle;
Recruit.TimerTitle = RecruitTimerTitle;
Recruit.Timer = RecruitTimer;
Recruit.Button = RecruitButton;
Recruit.Motion = RecruitMotion;
