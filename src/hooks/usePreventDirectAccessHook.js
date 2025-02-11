import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// WelcomeSection.jsx - 직접 url쳐서 들어오는 접근 막고 다른 페이지로 보내기
export function usePreventDirectAccess() {
  const [isAccessSuccess, setIsAccessSuccess] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 이전 페이지 정보 확인
    if (!location.state || location.state.prevPage !== 'AllowAccess') {
      navigate('/', { replace: true }); // 정상적인 접근 아니면 페이지 이동
    } else {
      setIsAccessSuccess(true);
    }
  }, [location.state, navigate]);

  return isAccessSuccess;
}
