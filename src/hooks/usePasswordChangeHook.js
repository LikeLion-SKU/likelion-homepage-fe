import { APIService } from '@api/axios';

// 비밀번호 변경
export async function usePasswordChanging(form, setErrors, navigate, token) {
  try {
    const requestData = {
      currentPassword: form.password,
      newPassword: form.newpassword,
    };

    const response = await APIService.private.put(import.meta.env.VITE_APP_CHANGE_PASSWORD, requestData, { token });

    if (response.success) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      navigate('/');
    } else {
      setErrors({
        password: response.message,
      });
    }
  } catch {
    alert('비밀번호 변경 중 오류가 발생했습니다.');
  }
}
