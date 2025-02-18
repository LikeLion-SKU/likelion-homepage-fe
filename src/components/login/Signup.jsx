import { useNavigate } from 'react-router-dom';

import styles from './Signup.module.css';

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles['signup-container']}>
        <p className={styles['signup-mention']}>계정이 없으신가요?</p>
        <button
          className={styles['signup-button']}
          onClick={function () {
            navigate('/signup');
          }}
        >
          회원가입
        </button>
      </div>
      <p className={styles['signup-notice']}>신규 회원은 포탈 아이디가 아닌 새로 회원가입을 하셔야 합니다.</p>
    </div>
  );
}
