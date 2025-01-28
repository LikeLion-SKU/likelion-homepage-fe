import { useEffect, useState } from 'react';
import styles from './aboutPage.module.css';
import Card from './Card';
import Chairman from './Chairman';
import { getAbout } from '@/api/adminAPI';

export default function Management({ selectedYear }) {
  const [managementMembers, setManagementMembers] = useState([]);
  const parts = ['기획', '디자인', '프론트엔드', '백엔드'];
  const role = 'COREMEMBER';

  useEffect(() => {
    if (selectedYear) {
      fetchManagementData(selectedYear);
    }
  }, [selectedYear]);

  const fetchManagementData = async (semester) => {
    try {
      const data = await Promise.all(parts.map((part) => getAbout(semester, part, role)));
      const formattedData = parts.reduce((acc, part, index) => {
        acc[part] = data[index].users; // 각 파트의 'users' 배열을 저장
        return acc;
      }, {});

      setManagementMembers(formattedData);
    } catch (error) {
      console.error('운영진 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.managementContainer}>
        <p className={styles.mainText}>운영진</p>
        <Chairman />
        {parts.map((part) => (
          <div key={part}>
            <div className={styles.subTitleGrid}>
              <p className={styles.subText}>{part}</p>
            </div>
            <div className={styles.managementCardGrid}>
              {managementMembers[part] &&
                managementMembers[part].map((member, index) => (
                  <Card
                    key={index}
                    name={member.userName}
                    department={member.department}
                    studentId={member.studentId}
                    profileImage={member.profileImageUrl}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
