import { handleTmpRes } from '@/hooks/useApplyHook';
import { useStore } from '@/store/useStore';
import styles from '@components/applicationForm/HeaderSection.module.css';
import { useSearchParams } from 'react-router-dom';

export default function HeaderSection() {
  const [param] = useSearchParams();
  const step = parseInt(param.get('step'), 10);
  const { answers, questions, track } = useStore();

  return (
    <div className={styles.headerContainer}>
      <span className={styles.header}>멋사 13기 지원서</span>
      <div className={styles.buttonWrapper}>
        <button
          style={step === 1 ? { display: 'none' } : null}
          onClick={() => handleTmpRes(answers, questions, track.value)}
          className={styles.saveBtn}
        >
          임시저장
        </button>
      </div>
    </div>
  );
}
