import { useEffect } from 'react';
import styles from '@components/adminAboutPage/generation.module.css';

export default function Generation({ selectedYear, setSelectedYear }) {
  const years = [12, 13, 14];

  // 컴포넌트 로드 시 가장 최근 연도로 초기화
  useEffect(() => {
    const defaultYear = Math.max(...years);
    setSelectedYear(defaultYear);
  }, [setSelectedYear]);

  const changeSemester = (semester) => {
    setSelectedYear(semester);
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>멋사인</p>
        <div className={styles.buttonContainer}>
          <div className={styles.navbar}>
            {years.map((year, index) => (
              <button
                key={index}
                className={selectedYear === year ? styles.button : ''}
                onClick={() => changeSemester(year)}
              >
                LIKELION SKU {year}TH
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
