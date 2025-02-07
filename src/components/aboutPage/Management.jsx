import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './aboutPage.module.css';
import Card from './Card';
import Chairman from './Chairman';
import { getAbout } from '@/api/aboutAPI';

export default function Management({ selectedYear }) {
  const [managementMembers, setManagementMembers] = useState([]);
  const [parts, setParts] = useState(['기획', '디자인', '프론트엔드', '백엔드']);
  const [isLoading, setIsLoading] = useState(true);
  const role = 'COREMEMBER';

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

  async function fetchManagementData(updatedParts, semester) {
    setIsLoading(true); // 로딩 시작
    try {
      const data = await Promise.all(updatedParts.map((part) => getAbout(semester, part, role)));
      const formattedData = updatedParts.reduce((acc, part, index) => {
        acc[part] = data[index]?.users || [];
        return acc;
      }, {});

      setManagementMembers(formattedData);
    } catch {
      location.href = '/error';
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  }

  return (
    <div className={styles.allContainer}>
      <div className={styles.managementContainer}>
        <p className={styles.mainText}>운영진</p>
        <Chairman year={selectedYear} />
        {parts.map((part) => (
          <div key={part}>
            <div className={styles.subTitleGrid}>
              <p className={styles.subText}>{part === '기획디자인' ? '기획/디자인' : part}</p>
            </div>
            <div className={styles.managementCardGrid}>
              {isLoading
                ? Array(6) // 스켈레톤 카드 6개 표시
                    .fill(null)
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        className={styles.cardSkeleton}
                      />
                    ))
                : managementMembers[part] &&
                  managementMembers[part].map((member) => (
                    <Card
                      key={member.studentId}
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
