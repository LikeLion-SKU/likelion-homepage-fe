import styles from './aboutPage.module.css';
import Card from './Card';
import profileImage from '@/assets/svgs/ex.svg';
import Chairman from './Chairman';

export default function Management({selectedYear}) {
  const managementMembers = [
    { name: '김운영', department: '컴퓨터 공학과 22학번', part: '백엔드' },
    { name: '이운영', department: '컴퓨터 공학과 21학번', part: '백엔드', profileImage },
    { name: '박운영', department: '컴퓨터 공학과 20학번', part: '백엔드', profileImage },
  ];

  return (
    <div className={styles.allContainer}>
      <div className={styles.managementContainer}>
        <p className={styles.mainText}>운영진</p>
        <Chairman />
        <div className={styles.subTitleGrid}>
          <p className={styles.subText}>기획/디자인</p>
        </div>
        <div className={styles.managementCardGrid}>
          {managementMembers.map((member, index) => (
            <Card
              key={index}
              name={member.name}
              department={member.department}
              profileImage={member.profileImage}
            />
          ))}
        </div>
        <div className={styles.subTitleGrid}>
          <p className={styles.subText}>프론트엔드</p>
        </div>
        <div className={styles.managementCardGrid}>
          {managementMembers.map((member, index) => (
            <Card
              key={index}
              name={member.name}
              department={member.department}
              profileImage={member.profileImage}
            />
          ))}
        </div>
        <div className={styles.subTitleGrid}>
          <p className={styles.subText}>백엔드</p>
        </div>
        <div className={styles.managementCardGrid}>
          {managementMembers.map((member, index) => (
            <Card
              key={index}
              name={member.name}
              department={member.department}
              profileImage={member.profileImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
