import { APIService } from '@api/axios';

// PasswordFindForm.jsx - 이메일 인증 성공 후, 비밀번호 찾기 버튼 클릭 //
// 임시 비밀번호 발급
export async function subPasswordGet(form, setEmail, setNow, setSubPassword, setIsLoading) {
  try {
    setIsLoading(true);
    const fullEmail = `${form.sendemail}@skuniv.ac.kr`;

    const requestData = {
      loginId: fullEmail,
    };

    const response = await APIService.private.post(import.meta.env.VITE_APP_FIND_PASSWORD, requestData);

    // message에서 임시 비밀번호만 얻어서 pw에 저장.
    const message = response.message;
    const match = message.match(/임시 비밀번호는\s+(.+?)\s+입니다\./);
    const pw = match ? match[1] : null;

    // verified가 false인 경우도 처리
    if (response.success === true) {
      setSubPassword(pw);
      setEmail(form.sendemail);
      setNow(2); // 2번째 페이지 보여줌.
    } else {
      alert(response.message);
    }
  } catch {
    // 서버 응답 자체가 실패한 경우
    alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  } finally {
    setIsLoading(false);
  }
}
