import { APIService } from '@api/axios';

// LoginForm.jsx - 로그인 버튼 클릭 //
// 로그인 진행
export async function login(userData, errors, navigate, setIsLoading) {
  if (errors.loginId?.message || errors.password?.message) {
    alert('잘못된 이메일 또는 비밀번호를 입력하셨습니다.');
  } else {
    try {
      setIsLoading(true);
      const fullEmail = userData.loginId === 'test' ? 'test' : `${userData.loginId}@skuniv.ac.kr`;

      const requestData = {
        loginId: fullEmail,
        password: userData.password,
      };

      const response = await APIService.public.post(import.meta.env.VITE_APP_LOGIN, requestData);
      if (response) {
        setIsLoading(false);
      }

      if (response.success === true) {
        // localStorage에 토큰 저장
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        // 홈화면으로 이동
        navigate('/');
      } else {
        alert('잘못된 이메일 또는 비밀번호를 입력하셨습니다.');
      }
    } catch {
      alert('잘못된 이메일 또는 비밀번호를 입력하셨습니다.');
    } finally {
      setIsLoading(false);
    }
  }
}
