import { APIService } from '@api/axios';
import { handleSignup } from '@utils/register.js';

// 회원가입 버튼 클릭 //
export function handleSignupClick(event, form, setErrors, setSignupSuccess, setNow, navigate) {
  event.preventDefault();

  const isValid = handleSignup(setErrors, form);
  if (isValid === true && form.id_valid === true && form.consent === true) {
    signUp(form, setSignupSuccess, setNow, navigate);
  }
}

export async function signUp(form, setSignupSuccess, setNow, navigate) {
  try {
    const requestData = {
      loginId: form.id,
      password: form.password,
      userName: form.name,
      department: form.department,
      studentId: form.strudent_num,
      semester: form.semester === '' ? 0 : Number(form.semester),
      phoneNumber: form.phone_num,
      parts: form.part,
    };

    const response = await APIService.public.post(import.meta.env.VITE_APP_SIGN_UP, requestData);

    if (response.success) {
      setSignupSuccess(true);
      setNow(1);
      navigate(`/welcome?name=${encodeURIComponent(form.name)}`);
    } else {
      let tologin = confirm(response.message + ' 로그인 페이지로 이동합니다.');
      if (tologin) {
        navigate('/login');
      }
    }
  } catch {
    alert('회원가입 중 서버 오류가 발생했습니다. 나중에 다시 시도해주세요');
  }
}

export function handleCheckboxChange(event, form, setForm) {
  setForm({ ...form, consent: event.target.checked });
}
