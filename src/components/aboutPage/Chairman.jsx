import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './chairman.module.css';
import Card from './Card';
import { getChairman } from '@/api/aboutAPI';

export default function Chairman({ year }) {
  const [chairman, setChairman] = useState(null); // 회장 정보
  const [coChairman, setCoChairman] = useState(null); // 부회장 정보
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (year) {
      fetchChairmanData('LEAD', setChairman); // 회장 데이터 요청
      fetchChairmanData('COLEAD', setCoChairman); // 부회장 데이터 요청
    }
  }, [year]);

  async function fetchChairmanData(role, setter) {
    setIsLoading(true);
    try {
      const response = await getChairman(role);
      const users = response?.users || [];

      // year(semester)와 동일한 데이터 필터링
      const filteredMember = users.find((user) => user.semester == year);
      if (filteredMember) {
        setter({
          name: filteredMember.userName,
          department: `${filteredMember.department} ${filteredMember.studentId.slice(2, 4)}학번`,
          profileImage: filteredMember.profileImageUrl,
          role: role === 'LEAD' ? '회장' : '부회장', // 역할 이름 변환
        });
      } else {
        setter(null);
      }
    } catch {
      location.href = '/error';
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  }

  return (
    <div className={styles.allContainer}>
      <div className={styles.chairmanContainer}>
        <div className={styles.chairmanCardGrid}>
          {/* 회장 카드 */}
          {isLoading || !chairman ? (
            <div className={styles.chairman}>
              <p className={styles.mainText}>회장</p>
              <Skeleton className={styles.cardSkeleton} />
            </div>
          ) : (
            <div className={styles.chairman}>
              <p className={styles.mainText}>{chairman.role}</p>
              <Card
                name={chairman.name}
                department={chairman.department}
                profileImage={chairman.profileImage}
              />
            </div>
          )}

          {/* 부회장 카드 */}
          {isLoading || !coChairman ? (
            <div className={styles.chairman}>
              <p className={styles.mainText}>부회장</p>
              <Skeleton className={styles.cardSkeleton} />
            </div>
          ) : (
            <div className={styles.chairman}>
              <p className={styles.mainText}>{coChairman.role}</p>
              <Card
                name={coChairman.name}
                department={coChairman.department}
                profileImage={coChairman.profileImage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
