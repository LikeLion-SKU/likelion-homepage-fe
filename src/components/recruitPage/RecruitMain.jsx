import { useEffect, useState } from 'react';
import LionImage from '@assets/homepage/lion.webp';
import styles from './recruitMain.module.css';
import { useNavigate } from 'react-router-dom';
import { getScedules } from '@api/recruitAPI';

export default function RecruitMain() {
  const [isResultTime, setIsResultTime] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [schedule, setSchedule] = useState({
    openDate: null,
    deadline: null,
    resultDate: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSchedules() {
      try {
        const res = await getScedules();
        if (res) {
          const { openDate, deadline, resultDate } = res;

          // 상태 업데이트 (openDate, deadline, resultDate)
          setSchedule({
            openDate: openDate ? new Date(openDate) : null,
            deadline: deadline ? new Date(deadline) : null,
            resultDate: resultDate ? new Date(resultDate) : null,
          });

          checkTime(
            openDate ? new Date(openDate) : null,
            deadline ? new Date(deadline) : null,
            resultDate ? new Date(resultDate) : null,
          ); // 모집 상태 체크
        }
      } catch (error) {
        navigate('/error');
      }
    }

    function checkTime(start, end, result) {
      const now = new Date(); // 현재 시간

      if (result && now >= result) {
        setIsResultTime(true); // 결과 발표 기간이면 결과 확인 버튼 활성화
        localStorage.setItem('canAccessResult', 'true'); // 로컬스토리지 저장
      }

      if (result && now >= end && now < result) {
        setIsDisabled(true); // 결과 산정 중 상태면 버튼 비활성화
      } else {
        setIsDisabled(false); // 모집 가능 상태면 버튼 활성화
      }
    }

    fetchSchedules(); // API 호출해서 모집 일정 받아옴

    const interval = setInterval(() => {
      checkTime(schedule.openDate, schedule.deadline, schedule.resultDate);
    }, 1000 * 60); // 1분마다 모집 일정 확인

    return () => clearInterval(interval); // 언마운트 시 인터벌 제거
  }, []);

  function handleRecruitButtonClick() {
    if (!schedule.openDate || !schedule.deadline || !schedule.resultDate) {
      // 활성화된 지원서가 없을경우
      alert('모집 기간이 아닙니다.');
      return;
    }
    navigate(isResultTime ? '/result' : '/apply');
  }

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className={styles.allContainer}>
      <div className={styles.D_dayContainer}>
        <p className={styles.dayText}>LIKELION SKU</p>
        <p className={styles.mainText}>13기 아기사자 모집</p>
      </div>
      <img
        src={LionImage}
        alt='사자 이미지'
        className={styles.lionImg}
      />
      <button
        className={styles.recruitButton}
        onClick={handleRecruitButtonClick}
        disabled={isDisabled}
      >
        {isResultTime ? '결과 확인하기' : isDisabled ? '결과 산정 중' : '멋사 지원하기'}
      </button>
      <div className={styles.pageButtonContainer}>
        <button
          className={styles.pageButton}
          onClick={() => scrollToSection('scheduleSection')}
        >
          모집 일정
        </button>
        <button
          className={styles.pageButton}
          onClick={() => scrollToSection('requirementSection')}
        >
          모집 대상
        </button>
        <button
          className={styles.pageButton}
          onClick={() => scrollToSection('questionSection')}
        >
          자주 묻는 질문
        </button>
      </div>
    </div>
  );
}
