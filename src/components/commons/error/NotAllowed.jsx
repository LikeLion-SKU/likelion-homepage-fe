import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './NotAllowed.module.css';

export default function NotAllowed() {
  const location = useLocation();
  const navigate = useNavigate();
  const [count, setCount] = useState(3);
  const {
    msg = '접근 권한이 없습니다',
    msg2 = 'URL을 통한 페이지 접근은 불가능합니다.',
    msg3 = '',
    msg4 = '',
    btnMsg = '홈으로 돌아가기',
    url = '/',
  } = location.state || {};

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(url);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, url]);

  return (
    <div className={styles.pageWrapper}>
      <h1>{msg}</h1>
      <div>
        <p>{msg2}</p>
        <p>{msg3}</p>
        <p>{msg4}</p>
        <p>{count}초 후 리다이렉트됩니다...</p>
      </div>
      <Link to={url}>{btnMsg}</Link>
    </div>
  );
}
