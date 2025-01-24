import { useNavigate } from 'react-router-dom';

import styles from './Signup.module.css';

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className={styles['signup-boxs']}>
      <div className={styles['signup-box']}>
        <p className={styles['signup-mention']}>비밀번호가 기억이 안나시나요?</p>
        <button
          className={styles['signup-button']}
          onClick={function () {
            navigate('/passwordFind');
          }}
        >
          비밀번호 찾기
        </button>
      </div>
      <div className={styles['signup-box']}>
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
    </div>
  );
}
