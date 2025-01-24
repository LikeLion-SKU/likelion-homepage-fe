// 비번찾기 페이지.
import { useState } from 'react';
import { useEffect } from 'react';
import { handleEmailchecking, handleConfirmCodechecking } from '../../utils/register.js';
import styles from './PasswordFindForm.module.css';
import { APIService } from '@api/axios';

export default function PasswordFindForm({ emailSuccess, setEmailSuccess, setEmail, setNow, setSubPassword }) {
  const [form, setForm] = useState({
    email: '',
    email_valid: false,
    confirmCode: '',
    confirmCode_valid: false,
    sendemail: '',
    timing: false,
  });
  const [m, setM] = useState();
  const [s, setS] = useState();
  const [count, setCount] = useState();
  const [errors, setErrors] = useState({
    email: '',
    confirmCode: '',
  });
  const [sendSuccess, setSendSuccess] = useState(1);
  const [confirmSuccess, setConfirmSuccess] = useState(1);
  const [confirms, setConfirms] = useState({});

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
        confirmCode: '입력 시간이 만료되었습니다. 다시 인증번호를 전송해주세요.',
      });
    }
  }, [count]);

  function inputChange(event) {
    const { id, value } = event.target;
    setForm({ ...form, [id]: value });

    if (id === 'email') {
      if (value === '') {
        setSendSuccess(1);
      } else {
        setSendSuccess(2);
      }
    } else if (id === 'confirmCode') {
      if (value === '') {
        setConfirmSuccess(1);
      } else {
        setConfirmSuccess(2);
      }
    }
  }

  // 인증번호 전송 버튼 클릭 //
  async function handleSendingClick(event) {
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
          setSendSuccess(2);
          setConfirms({ ...form, email: '인증번호가 전송되었습니다.' });
          setCount(300); // 5분
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
  async function handleCheckingClick(event) {
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

  // 비밀번호 찾기 버튼 클릭 => 임시 비번 발급하고 성공하면 페이지 넘기기 //
  function next(e) {
    e.preventDefault();
    setEmail(form.sendemail); // 이메일 값을 상위 컴포넌트로 전달
    setNow(2); // 2번째 페이지 보여줌.
  }

  return (
    <div className={styles['passwordFind-form']}>
      <p className={styles['passwordFind-form__title']}>비밀번호 찾기</p>
      <div className={styles['passwordFind-form__inputboxs']}>
        <div className={styles['passwordFind-form__inputbox']}>
          <div className={styles['passwordFind-form__labelsection']}>
            <label htmlFor='email'>이메일</label>
          </div>
          <div className={styles['passwordFind-form__inputsection']}>
            <div className={styles['passwordFind-form__input']}>
              <input
                type='text'
                id='email'
                value={form.email}
                className={form.email_valid ? 'valid' : errors.email ? 'invalid' : form.email ? 'valid' : ''}
                onChange={inputChange}
                disabled={sendSuccess === 3 ? true : false}
                autoComplete='off'
                required
              ></input>
              <p> @skuniv.ac.kr </p>
              <button
                style={{ cursor: 'pointer' }}
                className={
                  sendSuccess === 2
                    ? styles['passwordFind-form__inputbutton']
                    : styles['passwordFind-form__inputbuttonYet']
                }
                onClick={handleSendingClick}
              >
                {sendSuccess === 3 ? '전송중' : '인증번호 전송'}
              </button>
            </div>
            {form.email_valid ? (
              <p className={styles.ok_message}>{confirms.email}</p>
            ) : errors.email ? (
              <p className={styles.error_message}>{errors.email}</p>
            ) : null}
          </div>
        </div>
        <div className={styles['passwordFind-form__inputbox']}>
          <div className={styles['passwordFind-form__inputsection']}>
            <div className={styles['passwordFind-form__input']}>
              {sendSuccess === 2 && form.email_valid === true ? (
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
                    onChange={inputChange}
                    disabled={!form.timing}
                    autoComplete='off'
                    required
                  ></input>
                  <button
                    style={{ cursor: 'pointer' }}
                    className={
                      confirmSuccess === 1
                        ? styles['passwordFind-form__inputbuttonYet']
                        : styles['passwordFind-form__inputbutton']
                    }
                    onClick={handleCheckingClick}
                  >
                    인증번호 확인
                  </button>
                </>
              ) : sendSuccess === 3 ? (
                <div className={styles['loaderBox']}>
                  <div className={styles['loader']}></div>
                </div>
              ) : (
                <div style={{ visibility: 'hidden' }}>
                  ?
                  <input
                    type='text'
                    id='confirmCode'
                    value={form.confirmCode}
                    className={errors.confirmCode ? 'invalid' : form.confirmCode ? 'valid' : ''}
                    onChange={inputChange}
                    autoComplete='off'
                    disabled={true}
                  ></input>
                  <button
                    style={{ cursor: 'pointer' }}
                    className={
                      confirmSuccess === 1
                        ? styles['passwordFind-form__inputbuttonYet']
                        : styles['passwordFind-form__inputbutton']
                    }
                    onClick={handleCheckingClick}
                  >
                    인증번호 확인
                  </button>
                </div>
              )}
            </div>
            {sendSuccess === 2 && form.email_valid === true ? (
              <div className={styles['passwordFind-form__confirmCodeMessegeBox']}>
                {form.confirmCode_valid ? (
                  <p className={styles.ok_message}>{confirms.confirmCode}</p>
                ) : errors.confirmCode ? (
                  <p className={styles.error_message}>{errors.confirmCode}</p>
                ) : null}
                {form.timing ? (
                  <div className={styles['passwordFind-form__timesection']}>
                    <p className={styles['passwordFind-form__timeTitle']}>입력대기시간 </p>
                    <p className={styles['passwordFind-form__timeNum']}>
                      {m}:{s.toString().padStart(2, '0')}
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles['passwordFind-form__forgetMessageBox']}>
          <p className={styles['passwordFind-form__forgetMessage']}>아이디가 생각나지 않을 경우</p>
          <p className={styles['passwordFind-form__forgetMessage']}>skuofficial@likelion.org로 문의바랍니다.</p>
        </div>
        <div
          name='PasswordFind_progress_box'
          className={styles['passwordFind-form__progressBox1']}
        >
          {emailSuccess === true ? (
            <button
              style={{ cursor: 'pointer' }}
              className={styles['passwordFind-form__button--submittingSuccess']}
              onClick={next}
            >
              비밀번호 찾기
            </button>
          ) : (
            <button className={styles['passwordFind-form__button--submittingYet']}>비밀번호 찾기</button>
          )}
        </div>
        <button
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.preventDefault();
            console.log(form);
            console.log('이동해줘!!!!');
            setNow(2);
          }}
        >
          결과 페이지로 이동~~~~
        </button>
      </div>
    </div>
  );
}
