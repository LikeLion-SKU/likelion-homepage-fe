import LionImage from '@/assets/recruitPage/lionImg.svg';
import styles from './recruitMain.module.css';
import { useNavigate } from 'react-router-dom';

export default function RecruitMain() {
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const navigate = useNavigate();

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
          navigate('/apply');
        }}
      >
        멋사 지원하기
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
