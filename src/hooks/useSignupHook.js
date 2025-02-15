import { APIService } from '@api/axios';
import { useEffect } from 'react';
import { invalidationKey } from '@/utils/register';

// SignupSection1.jsx - 이메일 인증 성공 후, 계속 버튼 클릭 //
// 다음 페이지(SignupSection2.jsx)를 보여줌
export function next(e, form, setEmail, setNow) {
  e.preventDefault();
  setEmail(form.sendemail); // 이메일 값을 상위 컴포넌트로 전달
  setNow(2); // 2번째 페이지 보여줌.
}

// SignupSection2.jsx - 회원가입 버튼 클릭 //
// 유효성 검사 실패시, alert창 띄우기
export function useInvalidationAlert(errors, isValid) {
  useEffect(() => {
    if (isValid === false) {
      const invalidations = invalidationKey(errors);

      if (invalidations) {
        alert(`잘못된 형식으로 기입된 란이 있습니다:\n${invalidations}을(를) 다시 확인해주세요.`);
      }
    }
  }, [errors, isValid]);
}

// 회원가입 진행
export async function signUp(form, setSignupSuccess, setNow, navigate) {
  try {
    const requestData = {
      loginId: form.id,
      password: form.password,
      userName: form.name,
      department: form.department,
      studentId: form.strudent_num,
      phoneNumber: form.phone_num,
    };

    const response = await APIService.public.post(import.meta.env.VITE_APP_SIGN_UP, requestData);

    if (response.success) {
      setSignupSuccess(true);
      setNow(1);
      navigate(`/welcome?name=${encodeURIComponent(form.name)}`, { state: { prevPage: 'AllowAccess' }, replace: true });
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

// SignupSection2 - 이용 동의서 체크 박스 //
export function handleCheckboxChange(event, form, setForm) {
  setForm({ ...form, consent: event.target.checked });
}
