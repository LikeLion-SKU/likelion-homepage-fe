import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleEmailchecking, handleConfirmCodechecking } from '@utils/register.js';
import { inputChange, inputChangeNumber } from '@utils/inputOnChange.js';
import styles from './SignupSection.module.css';
import { TailSpin } from 'react-loader-spinner';

import { handleSendingClick, handleCheckingClick, useTimerEmailConfirm } from '@hooks/useEmailConfirmHook.js';
import { next } from '@hooks/useSignupHook.js';

export default function SignupSection({ emailSuccess, setEmailSuccess, setEmail, setNow }) {
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
    id: '',
    password: '',
    password_valid: '',
    name: '',
    department: '',
    phone_num: '',
    email: '',
    confirmCode: '',
  });
  const [sendSuccess, setSendSuccess] = useState(1);
  const [confirmSuccess, setConfirmSuccess] = useState(1);
  const [confirms, setConfirms] = useState({});
  const navigate = useNavigate();

  useTimerEmailConfirm(
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
  );

  return (
    <div className={styles['signup-form']}>
      <p className={styles['signup-form__title']}>회원가입</p>
      <div className={styles['signup-form__inputboxs']}>
        <div className={styles['signup-form__inputbox']}>
          <div className={styles['signup-form__labelsection']}>
            <label htmlFor='email'>이메일</label>
            <p>*</p>
          </div>
          <div className={styles['signup-form__inputsection']}>
            <div className={styles['signup-form__input']}>
              <input
                type='text'
                id='email'
                value={form.email}
                className={
                  form.email_valid
                    ? styles['valid']
                    : errors.email
                      ? styles['invalid']
                      : form.email
                        ? styles['valid']
                        : ''
                }
                onChange={function (e) {
                  inputChange(e, setForm, setSendSuccess);
                }}
                disabled={sendSuccess === 3 || sendSuccess == 4 ? true : false}
                autoComplete='off'
                required
              ></input>
              <p> @skuniv.ac.kr </p>
              <button
                disabled={sendSuccess === 2 ? false : true}
                className={
                  sendSuccess === 2 ? styles['signup-form__inputbutton'] : styles['signup-form__inputbuttonYet']
                }
                onClick={function (e) {
                  handleSendingClick(
                    e,
                    form,
                    setForm,
                    errors,
                    setErrors,
                    setConfirms,
                    setCount,
                    setSendSuccess,
                    handleEmailchecking,
                  );
                }}
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

        <div className={styles['signup-form__inputbox']}>
          <div className={styles['signup-form__inputsection']}>
            <div className={styles['signup-form__input']}>
              {sendSuccess === 3 ? (
                <div className={styles['loaderBox']}>
                  <TailSpin
                    visible={true}
                    height='40'
                    width='40'
                    color='#4fa94d'
                    ariaLabel='tail-spin-loading'
                    radius='1'
                    wrapperStyle={{}}
                    wrapperClass=''
                  />
                </div>
              ) : form.email_valid === true ? (
                <>
                  <input
                    type='text'
                    id='confirmCode'
                    maxLength={6}
                    value={form.confirmCode}
                    className={
                      form.confirmCode_valid
                        ? styles['valid']
                        : errors.confirmCode
                          ? styles['invalid']
                          : form.confirmCode
                            ? styles['valid']
                            : ''
                    }
                    onChange={inputChangeNumber(setForm, setConfirmSuccess)}
                    disabled={!form.timing}
                    autoComplete='off'
                    required
                  ></input>
                  <button
                    disabled={confirmSuccess === 2 ? false : true}
                    className={
                      confirmSuccess === 2 ? styles['signup-form__inputbutton'] : styles['signup-form__inputbuttonYet']
                    }
                    onClick={function (e) {
                      handleCheckingClick(
                        e,
                        form,
                        setForm,
                        setErrors,
                        setConfirms,
                        setEmailSuccess,
                        setConfirmSuccess,
                        handleConfirmCodechecking,
                      );
                    }}
                  >
                    인증번호 확인
                  </button>
                </>
              ) : null}
            </div>
            {sendSuccess !== 3 && form.email_valid === true ? (
              <div className={styles['signup-form__confirmCodeMessegeBox']}>
                {form.confirmCode_valid ? (
                  <p className={styles.ok_message}>{confirms.confirmCode}</p>
                ) : errors.confirmCode ? (
                  <p className={styles.error_message}>{errors.confirmCode}</p>
                ) : null}
                {form.timing ? (
                  <div className={styles['signup-form__timesection']}>
                    <p className={styles['signup-form__timeTitle']}>입력대기시간 </p>
                    <p className={styles['signup-form__timeNum']}>
                      {m}:{s.toString().padStart(2, '0')}
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <div
          name='Signup_progress_box'
          className={styles['signup-form__progressBox1']}
        >
          {emailSuccess === true ? (
            <button
              style={{ cursor: 'pointer' }}
              className={styles['signup-form__button--submittingSuccess']}
              onClick={function (event) {
                next(event, form, setEmail, setNow);
              }}
            >
              계속
            </button>
          ) : (
            <button className={styles['signup-form__button--submittingYet']}>계속</button>
          )}
          <div className={styles['login-togoBox']}>
            <p className={styles['login-mention']}>이미 계정이 있으신가요?</p>
            <button
              style={{ cursor: 'pointer' }}
              type='submit'
              className={styles['login-button']}
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
