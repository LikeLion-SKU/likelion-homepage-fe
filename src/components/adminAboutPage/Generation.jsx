import { useState, useEffect } from 'react';
import styles from './generation.module.css';
import { getProfile } from '@api/aboutAdminAPI';
import Registration from './Registration';

export default function Generation() {
  const years = [12, 13, 14];
  const [apiData, setApiData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const roleOrder = ['LEAD', 'COLEAD', 'COREMEMBER', 'BABYLION', 'GUEST'];

  async function changeSemester(semester) {
    try {
      const users = await getProfile(semester);
      const sortedUsers = users.sort((a, b) => {
        return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
      });
      setApiData(sortedUsers);
      setSelectedYear(semester);
    } catch {
      alert('API 호출 오류.');
    }
  }

  useEffect(() => {
    const defaultYear = Math.max(...years);
    changeSemester(defaultYear);
  }, []);

  return (
    <div className={styles.allContainer}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>멋사인 편집하기</p>
        <div className={styles.buttonContainer}>
          <div className={styles.navbar}>
            {years.map((year) => (
              <button
                key={year}
                className={`${styles.navbarButton} ${selectedYear === year ? styles.selectedButton : ''}`}
                onClick={() => changeSemester(year)}
              >
                LIKELION SKU {year}TH
              </button>
            ))}
          </div>
        </div>
      </div>

      <Registration users={apiData} />
    </div>
  );
}
