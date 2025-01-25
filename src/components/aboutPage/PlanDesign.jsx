import styles from './aboutPage.module.css';
import Card from './Card';

export default function PlanDesign() {
  const members = [
    { name: '김사자', department: '컴퓨터 공학과 22학번', part: '백엔드' },
    { name: '이사자', department: '컴퓨터 공학과 21학번', part: '백엔드' },
    { name: '박사자', department: '컴퓨터 공학과 20학번', part: '백엔드' },
    { name: '박사자', department: '컴퓨터 공학과 20학번', part: '백엔드' },
  ];

  return (
    <>
      <div className={styles.subTitleGrid}>
        <p className={styles.subText}>기획/디자인</p>
      </div>
      <div className={styles.managementCardGrid}>
        {members.map((member, index) => (
          <Card
            key={index}
            name={member.name}
            department={member.department}
            profileImage={member.profileImage}
          />
        ))}
      </div>
    </>
  );
}
