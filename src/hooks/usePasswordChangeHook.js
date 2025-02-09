import { APIService } from '@api/axios';

// 비밀번호 변경 버튼 클릭 //
export function handlePasswordChangeClick(userData, errors, setError, navigate, setIsLoading, token) {
  if (userData.password === '' && userData.newpassword === '' && userData.newpassword_valid === '') {
    alert('변경사항이 없습니다.');
  } else {
    if (!errors.password?.message && !errors.newpassword?.message && !errors.newpassword_valid?.message) {
      passwordChanging(userData, setError, navigate, setIsLoading, token);
    }
  }
}

// 비밀번호 변경
export async function passwordChanging(userData, setError, navigate, setIsLoading, token) {
  try {
    setIsLoading(true);
    const requestData = {
      currentPassword: userData.password,
      newPassword: userData.newpassword,
    };

    const response = await APIService.private.put(import.meta.env.VITE_APP_CHANGE_PASSWORD, requestData, { token });

    if (response.success) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      navigate('/');
    } else {
      setError('password', {
        message: response.message,
      });
    }
  } catch {
    alert('비밀번호 변경 중 오류가 발생했습니다.');
  } finally {
    setIsLoading(false);
  }
}
