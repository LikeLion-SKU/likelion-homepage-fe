import { APIService } from '@api/axios';
import { useEffect } from 'react';

// 타이머 관련 함수 //
export function useTimerEmailConfirm(
  form,
  setForm,
  setErrors,
  setConfirms,
  setSendSuccess,
  setConfirmSuccess,
  count,
  setCount,
  setM,
  setS,
) {
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [form.timing]);

  useEffect(() => {
    setM(Math.floor(count / 60));
    setS(count % 60);

    if (count === 0 || count < 0) {
      setForm({ ...form, timing: false, confirmCode: '' });
      setSendSuccess(2);
      setConfirmSuccess(1);
      setConfirms({});
      setErrors({
        ...form,
        confirmCode: '입력 시간이 만료되었습니다. 다시 인증번호를 전송해주세요.',
      });
    }
  }, [count]);
}

// 인증번호 전송 버튼 클릭 //
export async function handleSendingClick(
  event,
  form,
  setForm,
  errors,
  setErrors,
  setConfirms,
  setCount,
  setSendSuccess,
  handleEmailchecking,
) {
  event.preventDefault();
  const isValid = handleEmailchecking(setErrors, form);

  if (isValid) {
    try {
      setSendSuccess(3);
      // 이메일에 도메인을 붙여서 전송
      const fullEmail = `${form.email}@skuniv.ac.kr`;
      // 이메일 인증번호 전송 API 호출
      const response = await APIService.public.post(import.meta.env.VITE_APP_AUTH_EMAIL_SEND, { email: fullEmail });

      // 인증번호 이메일일 전송 성공시
      if (response.success === true) {
        setSendSuccess(4);
        setConfirms({ ...form, email: '인증번호가 전송되었습니다.' });
        setCount(300); // 5분 300
        setForm({ ...form, email_valid: true, sendemail: form.email, timing: true });
      } else {
        setErrors({
          ...errors,
          email: '인증번호 전송에 실패했습니다.',
        });
      }
    } catch (error) {
      //에러처리
      setErrors({
        ...errors,
        email: error.response?.data?.message || '인증번호 전송에 실패했습니다.',
      });
    }
  }
}

// 인증번호 확인 버튼 클릭 //
export async function handleCheckingClick(
  event,
  form,
  setForm,
  setErrors,
  setConfirms,
  setEmailSuccess,
  setConfirmSuccess,
  handleConfirmCodechecking,
) {
  event.preventDefault();

  const isValid = handleConfirmCodechecking(setErrors, form);
  if (!isValid) return;

  try {
    const fullEmail = `${form.sendemail}@skuniv.ac.kr`;

    const requestData = {
      email: fullEmail,
      code: String(form.confirmCode),
    };

    const response = await APIService.public.post(import.meta.env.VITE_APP_AUTH_EMAIL_VERIFY, requestData);

    // verified가 false인 경우도 처리
    if (response.verified === true) {
      setConfirms((prev) => ({
        ...prev,
        confirmCode: response.message || '이메일이 인증되었습니다.',
      }));

      setEmailSuccess(true);
      setForm((prev) => ({
        ...prev,
        confirmCode_valid: true,
        timing: false,
      }));
      setConfirmSuccess(1);
    } else {
      // 인증번호가 틀린 경우 (verified가 false인 경우)
      setErrors((prev) => {
        const newErrors = {
          ...prev,
          confirmCode: '잘못된 인증번호입니다. 다시 입력해주세요',
        };
        return newErrors;
      });

      // form의 confirmCode_valid 상태도 false로 설정
      setForm((prev) => ({
        ...prev,
        confirmCode_valid: false,
      }));
    }
  } catch {
    // 서버 응답 자체가 실패한 경우
    setErrors((prev) => ({
      ...prev,
      confirmCode: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    }));

    setForm((prev) => ({
      ...prev,
      confirmCode_valid: false,
    }));
  }
}
