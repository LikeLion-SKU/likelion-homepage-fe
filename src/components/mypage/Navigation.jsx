import styles from './MyPage.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getResultOnMyPage } from '@api/resultAPI';

export default function Navigation() {
  const navigate = useNavigate();
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    const checkPassStatus = async () => {
      try {
        const response = await getResultOnMyPage();
        // response가 없거나 data가 없는 경우도 처리
        setIsPassed(response?.isPassed ?? false);
      } catch (error) {
        // 400 이외의 에러만 alert 표시
        if (!error.response || error.response.status !== 400) {
          alert('다시 로그인 해주세요!');
        }
        setIsPassed(false);
      }
    };

    checkPassStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <nav className={styles.itembox}>
      <button
        className={styles.itembox__button}
        onClick={() => navigate('/application')}
      >
        내 지원서 보러가기
      </button>

      <button
        className={styles.itembox__button}
        onClick={() =>
          navigate('/passwordChange', {
            state: { prevPage: 'AllowAccess' },
            replace: true,
          })
        }
      >
        비밀번호 변경
      </button>

      {isPassed ? (
        <button
          className={styles.itembox__button}
          onClick={() => navigate('/my-schedule')}
        >
          면접일정 확인하기
        </button>
      ) : null}

      <button
        className={styles.itembox__button}
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </nav>
  );
}
