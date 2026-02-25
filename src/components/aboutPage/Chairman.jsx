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
    if (!year) return;

    const fetchBoth = async () => {
      setIsLoading(true);
      try {
        const [leadRes, coLeadRes] = await Promise.all([getChairman(year, 'LEAD'), getChairman(year, 'COLEAD')]);

        const lead = leadRes?.users?.[0];
        const coLead = coLeadRes?.users?.[0];

        setChairman(
          lead
            ? {
                name: lead.userName,
                department: `${lead.department} ${lead.studentId}`,
                profileImage: lead.profileImageUrl,
                role: '회장',
              }
            : null,
        );

        setCoChairman(
          coLead
            ? {
                name: coLead.userName,
                department: `${coLead.department} ${coLead.studentId}`,
                profileImage: coLead.profileImageUrl,
                role: '부회장',
              }
            : null,
        );
      } catch {
        location.href = '/error';
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoth();
  }, [year]);

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
