import { useNavigate } from 'react-router-dom';

import styles from './Signup.module.css';

export default function Signup() {
  const navigate = useNavigate();

  return (
    <>
      <p className={styles['signup-mention']}>계정이 없으신가요?</p>
      <button
        className={styles['signup-button']}
        onClick={function () {
          navigate('/signup');
        }}
      >
        회원가입
      </button>
    </>
  );
}
