import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { usePreventDirectAccess } from '@/hooks/usePreventDirectAccessHook';
import logo from '@assets/homepage/lion.webp';
import styles from './WelcomeSection.module.css';

export default function WelcomeSection() {
  const [searchParams] = useSearchParams();
  // 파라미터에서 name 읽기
  const name = searchParams.get('name') || 'GUEST';
  const navigate = useNavigate();

  const isAccessSuccess = usePreventDirectAccess();
  if (isAccessSuccess === null) return null;

  if (!isAccessSuccess) {
    return (
      <Navigate
        to={'/'}
        replace
      />
    );
  }

  // 홈으로 버튼 클릭 //
  function toHomeClick(e) {
    e.preventDefault();

    navigate('/'); // 2번째 페이지 보여줌.
  }

  return (
    <div className={styles['WelcomePage_layout']}>
      <div className={styles['welcome_img_box']}>
        <img
          src={logo}
          className={styles['welcomeImg']}
          alt='Logo'
        />
      </div>
      <div className={styles['welcomePage_messageBox']}>
        <p className={styles['userName']}>{name}님</p>
        <div className={styles['welcomePage_welcomeMessage']}>
          <p>서경대학교 멋쟁이사자처럼 홈페이지 </p>
          <p>가입을 환영합니다!</p>
        </div>
      </div>
      <div className={styles['welcomePage_Btn']}>
        <button
          style={{ cursor: 'pointer' }}
          onClick={toHomeClick}
        >
          홈으로
        </button>
      </div>
    </div>
  );
}
