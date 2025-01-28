import { useEffect, useState } from 'react';
import styles from './chairman.module.css';
import Card from './Card';
import { getChairman } from '@/api/aboutAPI'; // getChairman 함수 호출

export default function Chairman({ year }) {
  const [chairman, setChairman] = useState(null); // 회장 정보
  const [coChairman, setCoChairman] = useState(null); // 부회장 정보

  useEffect(() => {
    if (year) {
      fetchChairmanData('LEAD', setChairman); // 회장 데이터 요청
      fetchChairmanData('COLEAD', setCoChairman); // 부회장 데이터 요청
    }
  }, [year]);
  async function fetchChairmanData(role, setter) {
    try {
      const response = await getChairman(role);
      const users = response?.users || [];

      // year(semester)와 동일한 데이터 필터링
      const filteredMember = users.find((user) => user.semester == year);
      if (filteredMember) {
        setter({
          name: filteredMember.userName,
          department: `${filteredMember.department} ${filteredMember.studentId.slice(0, 4)}학번`,
          profileImage: filteredMember.profileImageUrl,
          role: role === 'LEAD' ? '회장' : '부회장', // 역할 이름 변환
        });
      } else {
        setter(null);
      }
    } catch {
      location.href = '/error';
    }
  }

  return (
    <div className={styles.allContainer}>
      <div className={styles.chairmanContainer}>
        <div className={styles.chairmanCardGrid}>
          {/* 회장 카드 */}
          {chairman ? (
            <div className={styles.chairman}>
              <p className={styles.mainText}>{chairman.role}</p>
              <Card
                name={chairman.name}
                department={chairman.department}
                profileImage={chairman.profileImage}
              />
            </div>
          ) : (
            <p>회장 정보가 없습니다.</p>
          )}

          {/* 부회장 카드 */}
          {coChairman ? (
            <div className={styles.chairman}>
              <p className={styles.mainText}>{coChairman.role}</p>
              <Card
                name={coChairman.name}
                department={coChairman.department}
                profileImage={coChairman.profileImage}
              />
            </div>
          ) : (
            <p>부회장 정보가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
