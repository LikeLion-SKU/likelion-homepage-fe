import { Link, useLocation } from 'react-router-dom';
import styles from './Error.module.css';

export default function Error() {
  const location = useLocation();
  const {
    msg = '예기치 못한 문제가 발생했습니다.',
    msg2 = '서버에 오류가 발생했습니다.',
    msg3 = '이용에 불편을 드려 죄송합니다.',
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
