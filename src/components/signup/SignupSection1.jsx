import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignupSection.module.css';
import { handleEmailchecking, handleConfirmCodechecking } from '../../utils/register.js';
import { APIService } from '../../api/axios.js';
import { handleInputChange } from '../../utils/inputOnChange.js';

export default function SignupSection({ emailSuccess, setEmailSuccess, setEmail, setNow }) {
  const [form, setForm] = useState({
    email: '',
    email_valid: false,
    confirmCode: '',
    confirmCode_valid: false,
    timing: false,
  });
  const [m, setM] = useState();
  const [s, setS] = useState();
  const [count, setCount] = useState();
  const [errors, setErrors] = useState({
    id: '',
    password: '',
    password_valid: '',
    name: '',
    department: '',
    semester: '',
    phone_num: '',
    part: '',
    email: '',
    confirmCode: '',
  });
  const [sendSuccess, setSendSuccess] = useState(1);
  const [confirms, setConfirms] = useState({});
  const navigate = useNavigate();

  // 타이머 관련 함수 //
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
      setErrors({
        ...form,
        confirmCode: '인증번호 확인 시간이 만료되었습니다. 다시 인증번호를 전송해주세요.',
      });
    }
  }, [count]);

  // 인증번호 전송 버튼 클릭 //
  const handleSendingClick = async (event) => {
    event.preventDefault();
    const isValid = handleEmailchecking(setErrors, form);

    if (isValid) {
      try {
        setSendSuccess(2);
        // 이메일에 도메인을 붙여서 전송
        const fullEmail = `${form.email}@skuniv.ac.kr`;
        // 이메일 인증번호 전송 API 호출
        const response = await APIService.public.post(import.meta.env.VITE_APP_AUTH_EMAIL_SEND, { email: fullEmail });

        // 인증번호 이메일일 전송 성공시
        if (response.success === true) {
          setSendSuccess(3);
          setConfirms({ ...form, email: '인증번호가 전송되었습니다.' });
          setCount(300); // 5분
          setForm({ ...form, email_valid: true, timing: true });
        }
      } catch (error) {
        //에러처리
        setErrors((prev) => ({
          ...prev,
          email: error.response?.data?.message || '인증번호 전송에 실패했습니다.',
        }));
      }
    }
  };

  // 인증번호 확인 버튼 클릭 //
  const handleCheckingClick = async (event) => {
    event.preventDefault();

    const isValid = handleConfirmCodechecking(setErrors, form);
    if (!isValid) return;

    try {
      const fullEmail = `${form.email}@skuniv.ac.kr`;

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
  };

  // 계속 버튼 클릭 //
  function next(e) {
    e.preventDefault();
    setEmail(form.email); // 이메일 값을 상위 컴포넌트로 전달
    setNow(2); // 2번째 페이지 보여줌.
  }

  return (
    <div className={styles.SignupPage_layout}>
      <div className={styles.Signup_input_information}>
        <p className={styles.title}>회원가입</p>
      </div>
      <div className={styles.Signup_input_boxs}>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label htmlFor='email'>이메일</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type='text'
                id='email'
                value={form.email}
                className={form.email_valid ? 'valid' : errors.email ? 'invalid' : form.email ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
                autoComplete='off'
                required
              ></input>
              <p> @skuniv.ac.kr </p>
              {sendSuccess === 1 ? (
                <button
                  style={{ cursor: 'pointer' }}
                  className={styles.checkingBtn}
                  onClick={handleSendingClick}
                >
                  인증번호 전송
                </button>
              ) : sendSuccess === 2 ? (
                <button
                  style={{ cursor: 'pointer' }}
                  className={styles.checkingBtn_Yet}
                >
                  전송중
                </button>
              ) : sendSuccess === 3 ? (
                <button
                  style={{ cursor: 'pointer' }}
                  className={styles.checkingBtn}
                  onClick={handleSendingClick}
                >
                  인증번호 재전송
                </button>
              ) : null}
            </div>
            {form.email_valid ? (
              <p className={styles.ok_message}>{confirms.email}</p>
            ) : errors.email ? (
              <p className={styles.error_message}>{errors.email}</p>
            ) : null}
          </div>
        </div>
        <div className={styles.Signup_input_box}>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              {form.email_valid ? (
                <>
                  <input
                    type='text'
                    id='confirmCode'
                    value={form.confirmCode}
                    className={
                      form.confirmCode_valid
                        ? 'valid'
                        : errors.confirmCode
                          ? 'invalid'
                          : form.confirmCode
                            ? 'valid'
                            : ''
                    }
                    onChange={handleInputChange(setForm)}
                    disabled={!form.timing}
                    autoComplete='off'
                    required
                  ></input>
                  <button
                    style={{ cursor: 'pointer' }}
                    className={styles.checkingBtn}
                    onClick={handleCheckingClick}
                  >
                    인증번호 확인
                  </button>
                </>
              ) : (
                <div style={{ visibility: 'hidden' }}>
                  ?
                  <input
                    type='text'
                    id='confirmCode'
                    value={form.confirmCode}
                    className={errors.confirmCode ? 'invalid' : form.confirmCode ? 'valid' : ''}
                    onChange={handleInputChange(setForm)}
                    autoComplete='off'
                    disabled={true}
                  ></input>
                  <button
                    className={styles.checkingBtn_Yet}
                    onClick={handleCheckingClick}
                  >
                    인증번호 확인
                  </button>
                </div>
              )}
            </div>
            <div className={styles.confirmCode_messegeBox}>
              {form.confirmCode_valid ? (
                <p className={styles.ok_message}>{confirms.confirmCode}</p>
              ) : errors.confirmCode ? (
                <p className={styles.error_message}>{errors.confirmCode}</p>
              ) : null}
              {form.timing ? (
                <p className={styles.time}>
                  입력대기시간 {m}:{s.toString().padStart(2, '0')}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div
          name='Signup_progress_box'
          className={styles.Signup_progress_box}
        >
          {emailSuccess === true ? (
            <button
              style={{ cursor: 'pointer' }}
              className={styles.SignupBtn_Success}
              onClick={next}
            >
              계속
            </button>
          ) : (
            <button className={styles.SignupBtn_Yet}>계속</button>
          )}
          <div className={styles.toLogin}>
            <p>이미 계정이 있으신가요?</p>
            <button
              style={{ cursor: 'pointer' }}
              type='submit'
              className={styles.tologinBtn}
              onClick={() => {
                navigate('/login');
              }}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
