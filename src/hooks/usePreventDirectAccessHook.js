import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// WelcomeSection.jsx - 직접 url쳐서 들어오는 접근 막고 다른 페이지로 보내기
export function usePreventDirectAccess() {
  const [isAccessSuccess, setIsAccessSuccess] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 이전 페이지 정보 확인(회원가입2 페이지에서 이동한게 정상)
    if (!location.state || location.state.prevPage !== 'AllowAccess') {
      navigate('/', { replace: true }); // 정상적인 접근 아니면 페이지 이동
    } else {
      setIsAccessSuccess(true);
    }
  }, [location.state, navigate]);

  return isAccessSuccess;
}

// 현재 로그인 상태인지 확인하는 함수
function isAuthenticated() {
  return !!localStorage.getItem('token'); // true면 로그인됨, false면 로그인 안 됨
}

// PasswordChangeForm.jsx - 로그인한 상태에서 마이페이지에서 이동했을 때만 접근 가능하게 검사
export function usePreventDirectAccessPWChange() {
  const [isAccessSuccess, setIsAccessSuccess] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 로그인 상태인지 확인
    const isLoggedIn = isAuthenticated();
    if (!isLoggedIn) {
      navigate('/login', { replace: true }); // 아니면 로그인 페이지로 이동
      return;
    }

    // 이전 페이지 정보 확인(마이페이지에서 이동한게 정상)
    if (!location.state || location.state.prevPage !== 'AllowAccess') {
      navigate('/mypage', { replace: true }); // 정상적인 접근 아니면 마이페이지로 이동
    } else {
      setIsAccessSuccess(true);
    }
  }, [location.state, navigate]);

  return isAccessSuccess;
}
