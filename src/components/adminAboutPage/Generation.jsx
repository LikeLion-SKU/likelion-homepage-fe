import { useState } from 'react';
import styles from './generation.module.css';
import styles2 from '@components/adminApply/Generation.module.css';
import { getProfile } from '@api/aboutAdminAPI';
import Registration from './Registration';

export default function Generation() {
  const years = [12, 13, 14];
  const [apiData, setApiData] = useState([]);

  async function changeSemester(semester) {
    try {
      const users = await getProfile(semester);
      setApiData(users);
    } catch (error) {
      console.error('API 호출 오류:', error);
    }
  }

  return (
    <div className={styles.allContainer}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>멋사인 편집하기</p>
        <div className={styles.buttonContainer}>
          <div className={styles2.navbar}>
            {years.map((year, index) => (
              <button
                key={index}
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
