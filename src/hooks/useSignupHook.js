import { APIService } from '@api/axios';

// 계속 버튼 클릭 //
export function next(e, form, setEmail, setNow) {
  e.preventDefault();
  setEmail(form.sendemail); // 이메일 값을 상위 컴포넌트로 전달
  setNow(2); // 2번째 페이지 보여줌.
}

// 회원가입 버튼 클릭 //
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
      const tologin = confirm(response.message + ' 로그인 페이지로 이동합니다.');
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
