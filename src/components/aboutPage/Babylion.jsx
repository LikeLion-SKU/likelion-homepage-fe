import { useEffect, useState } from 'react';
import styles from './aboutPage.module.css';
import Card from './Card';
import { getAbout } from '@/api/aboutAPI';

export default function BabyLion({ selectedYear }) {
  const [managementMembers, setManagementMembers] = useState([]);
  const [parts, setParts] = useState(['기획', '디자인', '프론트엔드', '백엔드']);
  const role = 'BABYLION';

  useEffect(() => {
    const updatedParts =
      selectedYear === 11 || selectedYear === 12
        ? ['기획디자인', '프론트엔드', '백엔드']
        : ['기획', '디자인', '프론트엔드', '백엔드'];

    setParts(updatedParts);

    if (selectedYear) {
      fetchManagementData(updatedParts, selectedYear);
    }
  }, [selectedYear]);

  const fetchManagementData = async (updatedParts, semester) => {
    try {
      const data = await Promise.all(updatedParts.map((part) => getAbout(semester, part, role)));
      const formattedData = updatedParts.reduce((acc, part, index) => {
        acc[part] = data[index]?.users || []; // 각 파트의 'users' 배열을 저장
        return acc;
      }, {});

      setManagementMembers(formattedData);
    } catch (error) {
      console.error('아기사자 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.managementContainer}>
        <p className={styles.mainText}>아기사자</p>
        {parts.map((part) => (
          <div key={part}>
            <div className={styles.subTitleGrid}>
              <p className={styles.subText}>{part === '기획디자인' ? '기획/디자인' : part}</p>
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
