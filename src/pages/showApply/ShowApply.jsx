import styles from '@styles/showApplyPage/ShowApply.module.css';
import Generation from '../../components/adminApply/Generation';

export default function ShowApply() {
  const applicants = [
    {
      name: '박태경',
      department: '컴퓨터공학과',
      id: 2022305040,
      track: '프론트엔드',
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <header>지원서 전체 보기</header>
      </div>
      <Generation />
      <div className={styles.showApplyWrapper}>
        <div className={styles.tableHeader}>
          <span>이름</span>
          <span>학과</span>
          <span>학번</span>
          <span>지원 트랙</span>
          <span />
        </div>
        <div className={styles.tableBody}>
          {applicants.map((applicant) => (
            <div className={styles.applicant} key={applicant.id}>
              <span>{applicant.name}</span>
              <span>{applicant.department}</span>
              <span>{applicant.id}</span>
              <span>{applicant.track}</span>
              <div className={styles.btnWrapper}>
                <button>지원서 바로가기</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
