import { APIService } from '@api/axios';
import { handlePasswordChangeForm } from '@utils/register.js';

// 비밀번호 변경 버튼 클릭 //
export function handlePasswordChangeClick(event, form, setErrors, navigate, token) {
  event.preventDefault();
  setErrors({});
  const isValid = handlePasswordChangeForm(setErrors, form);

  if (form.password === '' && form.newpassword === '' && form.newpassword_valid === '') {
    alert('변경사항이 없습니다.');
  } else {
    if (isValid === true) {
      passwordChanging(form, setErrors, navigate, token);
    }
  }
}

// 비밀번호 변경
export async function passwordChanging(form, setErrors, navigate, token) {
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
