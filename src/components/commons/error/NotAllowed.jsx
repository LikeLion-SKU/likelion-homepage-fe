import { Link, useLocation } from 'react-router-dom';
import styles from './NotAllowed.module.css';

export default function NotAllowed() {
  const location = useLocation();
  const {
    msg = '접근 권한이 없습니다',
    msg2 = 'url로 들어오면 안되요',
    msg3 = '',
    msg4 = '',
    btnMsg = '홈으로 돌아가기',
    url = '/',
  } = location.state || {};

  return (
    <div className={styles.pageWrapper}>
      <h1>{msg}</h1>
      <div>
        <p>{msg2}</p>
        <p>{msg3}</p>
        <p>{msg4}</p>
      </div>
      <Link to={url}>{btnMsg}</Link>
    </div>
  );
}
