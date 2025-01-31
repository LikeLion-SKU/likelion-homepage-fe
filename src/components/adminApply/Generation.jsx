import { useStore } from '@store/useStore';
import styles from './Generation.module.css';
import { getApplicants, getSemesters } from '@/api/adminApplyAPI';
import { useEffect, useState } from 'react';

export default function Generation() {
  const [years, setYears] = useState([]);
  const { setApplicants, setSemester, setSort } = useStore();

  useEffect(() => {
    const fetchSemester = async () => {
      const data = await getSemesters();
      setYears(data);
    };

    fetchSemester();
  }, []);

  function changeSemester(semester) {
    setSort('');
    setSemester(semester);
    getApplicants(setApplicants, semester);
  }
  return (
    <div className={styles.navbar}>
      {years.length > 0
        ? years.map((year, index) => (
            <button
              onClick={() => changeSemester(year)}
              key={index}
            >
              LIKELION SKU {year}TH
            </button>
          ))
        : null}
    </div>
  );
}
