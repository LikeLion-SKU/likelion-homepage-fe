import styles from './failPage.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getResult } from '@/api/resultAPI';

export default function FailPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

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

    // isPassed가 false여야만 fail 페이지에 접근할 수 있음
    const fetchResult = async function () {
      try {
        const response = await getResult({
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.isPassed) {
          navigate('/notallowed');
        }
      } catch {
        navigate('/error');
      }
    };

    fetchResult();
  }, [navigate]);

  return (
    <div className={styles.allContainer}>
      <div className={styles.contentContainer}>
        <p className={styles.content}>
          {`안녕하세요 서경대학교 멋쟁이사자처럼 운영진입니다.

            먼저 저희 동아리에 지원해주셔서 감사합니다.

            13기 서류 결과 불합격이라는 소식을 전해드립니다.

            많은 지원자로 인해 지원자님의 뛰어난 역량에도 불구하고 
            한정된 인원 때문에 더 많은 부원들을 모시지 못하게 되어 송구스럽게 생각합니다.

            다음 모집에는 더 많은 분들과 함께 하기 위해 노력하겠습니다.

            다시 한번 소중한 시간을 내어 지원해주셔서 진심으로 감사드립니다!`
            .split('\n')
            .map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
        </p>
      </div>
    </div>
  );
}
