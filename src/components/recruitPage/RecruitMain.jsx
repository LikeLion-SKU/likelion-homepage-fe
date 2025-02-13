import { useEffect, useState } from 'react';
import LionImage from '@assets/homepage/lion.webp';
import styles from './recruitMain.module.css';
import { useNavigate } from 'react-router-dom';

export default function RecruitMain() {
  const [isResultTime, setIsResultTime] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTime = () => {
      const resultTime = new Date('2025-03-08T12:00:00'); // 3월 8일 오후 12시
      const now = new Date();

      if (now >= resultTime) {
        setIsResultTime(true);
        localStorage.setItem('canAccessResult', 'true');
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000 * 60); // 1분마다 체크

    return () => clearInterval(interval);
  }, []);

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
        onClick={function () {
          navigate(isResultTime ? '/result' : '/apply');
        }}
      >
        {isResultTime ? '결과 확인하기' : '멋사 지원하기'}
      </button>
      <div className={styles.pageButtonContainer}>
        <button
          className={styles.pageButton}
          onClick={function () {
            scrollToSection('scheduleSection');
          }}
        >
          모집 일정
        </button>
        <button
          className={styles.pageButton}
          onClick={function () {
            scrollToSection('requirementSection');
          }}
        >
          모집 대상
        </button>
        <button
          className={styles.pageButton}
          onClick={function () {
            scrollToSection('questionSection');
          }}
        >
          자주 묻는 질문
        </button>
      </div>
    </div>
  );
}
