import styles from './PasswordFindResult.module.css';
import { useNavigate } from 'react-router-dom';

export default function PasswordFindResult({ email, subPassword }) {
  const navigate = useNavigate();

  return (
    <div className={styles['passwordFind-result']}>
      <p className={styles['passwordFind-result__title']}>비밀번호 찾기 결과</p>
      <div className={styles['passwordFind-result__items']}>
        <div className={styles['passwordFind-result__item']}>
          <label>이메일 ( 아이디 )</label>
          <div className={styles['passwordFind-result__box']}>
            <p className={styles['passwordFind-result__result']}>{email}</p>
          </div>
        </div>
        <div className={styles['passwordFind-result__item']}>
          <label>비밀번호</label>
          <div className={styles['passwordFind-result__box']}>
            <p className={styles['passwordFind-result__result']}>{subPassword}</p>
          </div>
        </div>
        <div className={styles['passwordFind-result__MessageBox']}>
          <p className={styles['passwordFind-result__Message']}>
            위 비밀번호는 임시 비밀번호입니다.<br></br>
            로그인 후 &quot;마이페이지&quot; =&gt; &quot;비밀번호 변경&quot; 에서<br></br>
            반드시 비밀번호를 변경해주세요.
          </p>
        </div>
        <div
          name='PasswordFind_progress_box'
          className={styles['passwordFind-result__progressBox1']}
        >
          <button
            style={{ cursor: 'pointer' }}
            className={styles['passwordFind-result__button--submittingSuccess']}
            onClick={function () {
              navigate('/login');
            }}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
