import styles from './passPage.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getResult } from '@/api/resultAPI';
import ConsentCheckboxes from './ConsentCheckboxes';
import WelcomeSection from './interview/component/WelcomeSection';
import InterviewScheduler from './interview/component/InterviewScheduler';

export default function PassPage() {
  const [consents, setConsents] = useState({
    feeConsent: false,
    attendanceConsent: false,
  });
  const isAllConsentsChecked = consents.feeConsent && consents.attendanceConsent;
  const navigate = useNavigate();

  useEffect(() => {
    //결과 확인 가능한 시간인지 검사
    const checkAccess = () => {
      const canAccessResult = localStorage.getItem('canAccessResult');
      if (!canAccessResult || canAccessResult !== 'true') {
        navigate('/notallowed');
        return false;
      }
      return true;
    };

    if (!checkAccess()) return;

    const fetchResult = async () => {
      try {
        const response = await getResult();
        if (!response.isPassed) {
          navigate('/notallowed');
        }
      } catch (error) {
        navigate('/error'); // 에러 발생 시 /error 페이지로 리디렉트
      }
    };

    fetchResult();
  }, [navigate]);

  return (
    <div className={styles.allContainer}>
      {/** 안내 문구 */}
      <WelcomeSection />
      {/** 참석 동의 같은거 */}
      <ConsentCheckboxes
        consents={consents}
        onConsentsChange={setConsents}
      />
      {/** 시간 정하는거 */}
      <InterviewScheduler isSubmitEnabled={isAllConsentsChecked} />
    </div>
  );
}
