import { useEffect, useState } from 'react';
import LionImage from '@assets/homepage/lion.webp';
import styles from './recruitMain.module.css';
import { useNavigate } from 'react-router-dom';

export default function RecruitMain() {
  const [isResultTime, setIsResultTime] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const resultTime = new Date('2025-03-08T12:00:00'); // 결과 확인 가능 시간
      const reviewStartTime = new Date('2025-03-07T00:00:00'); // 모집 마감
      const reviewEndTime = new Date('2025-03-08T12:00:00'); // 결과 나오기 전

      if (now >= resultTime) {
        setIsResultTime(true);
        localStorage.setItem('canAccessResult', 'true');
      }

      if (now >= reviewStartTime && now < reviewEndTime) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000 * 60); // 1분마다 체크

    return () => clearInterval(interval);
  }, []);

  function handleRecruitButtonClick() {
    if (isDisabled) {
      alert('모집 기간이 마감되었습니다.');
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
      >
        {isResultTime ? '결과 확인하기' : '멋사 지원하기'}
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
