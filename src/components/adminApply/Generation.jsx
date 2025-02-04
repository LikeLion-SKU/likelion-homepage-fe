import { useStore } from '@store/useStore';
import styles from './Generation.module.css';
import { getApplicants } from '@/api/adminApplyAPI';
import { useState } from 'react';
import { useGetSemesters } from '@/hooks/useAdminApplyHook';

export default function Generation() {
  const [years, setYears] = useState([]);
  const { setApplicants, setSemester, setSort } = useStore();

  useGetSemesters(setYears);

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
              onClick={function () {
                changeSemester(year);
              }}
              key={index}
            >
              LIKELION SKU {year}TH
            </button>
          ))
        : null}
    </div>
  );
}
