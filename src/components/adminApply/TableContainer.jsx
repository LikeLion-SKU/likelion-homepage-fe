import Select from 'react-select';
import styles from './TableContainer.module.css';
import { style } from '@constants/adminApplyConst';
import { options } from '@constants/adminApplyConst';
import { useGetApplicants } from '@hooks/useAdminApplyHook';
import { useNavigate } from 'react-router-dom';
import { assignPassed } from '@api/adminApplyAPI';
import { useStore } from '@store/useStore';

export default function TableContainer() {
  const { applicants, setApplicants, semester } = useStore();
  const navigate = useNavigate();

  useGetApplicants(setApplicants, semester);

  return (
    <div className={styles.showApplyWrapper}>
      <div className={styles.tableHeader}>
        <span>이름</span>
        <span>학과</span>
        <span>학번</span>
        <span>지원 트랙</span>
        <span>합격 여부</span>
        <span />
      </div>
      <div className={styles.tableBody}>
        {applicants.length > 0
          ? applicants.map((applicant) => (
              <div
                className={styles.applicant}
                key={applicant.id}
              >
                <span>{applicant.userName}</span>
                <span>{applicant.department}</span>
                <span>{applicant.studentId}</span>
                <span>{applicant.trackName}</span>
                <Select
                  styles={style}
                  options={options}
                  onChange={(value) => {
                    assignPassed(applicant.id, value, setApplicants);
                  }}
                  value={applicant.isPassed ? options[0] : options[1]}
                  placeholder='선택'
                  isSearchable={false}
                />
                <div className={styles.btnWrapper}>
                  <button onClick={() => navigate(`/admin/apply/${applicant.studentId}`)}>지원서 확인</button>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
