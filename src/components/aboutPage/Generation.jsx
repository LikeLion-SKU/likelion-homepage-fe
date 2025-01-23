import { useState, useEffect } from 'react';
import styles from '@components/adminAboutPage/generation.module.css';
import styles2 from '@components/adminApply/Generation.module.css';
import Management from './Management';

export default function Generation() {
  const years = [12, 13, 14];
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    const defaultYear = Math.max(...years);
    setSelectedYear(defaultYear);
  }, []);

  const changeSemester = (semester) => {
    setSelectedYear(semester);
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>멋사인</p>
        <div className={styles.buttonContainer}>
          <div className={styles2.navbar}>
            {years.map((year, index) => (
              <button
                key={index}
                className={selectedYear === year ? styles2.activeButton : ''} // 선택된 버튼 스타일
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
