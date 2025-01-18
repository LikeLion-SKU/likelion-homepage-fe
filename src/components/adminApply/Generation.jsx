import { useStore } from '@store/useStore';
import styles from './Generation.module.css';
import { getApplicants } from '@/api/adminApplyAPI';

export default function Generation() {
  const years = [12, 13, 14];
  const { setApplicants, setSemester } = useStore();

  function changeSemester(semester) {
    setSemester(semester);
    getApplicants(setApplicants, semester);
  }
  return (
    <div className={styles.navbar}>
      {years.map((year, index) => (
        <button
          onClick={() => changeSemester(year)}
          key={index}
        >
          LIKELION SKU {year}TH
        </button>
      ))}
    </div>
  );
}
