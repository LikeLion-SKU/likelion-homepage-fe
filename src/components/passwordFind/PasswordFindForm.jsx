// 비번찾기 페이지.
import { useState } from 'react';
import { handleEmailchecking, handleConfirmCodechecking } from '@utils/register.js';
import { inputChange } from '@utils/inputOnChange.js';
import styles from './PasswordFindForm.module.css';
import { TailSpin } from 'react-loader-spinner';

import { handleSendingClick, handleCheckingClick, useTimerEmailConfirm } from '@hooks/useEmailConfirmHook.js';
import { subPasswordGet } from '@hooks/usePasswordFindHook.js';

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
                  sendSuccess === 2
                    ? styles['passwordFind-form__inputbutton']
                    : styles['passwordFind-form__inputbuttonYet']
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

        <div className={styles['passwordFind-form__inputbox']}>
          <div className={styles['passwordFind-form__inputsection']}>
            <div className={styles['passwordFind-form__input']}>
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
                    onChange={function (e) {
                      inputChange(e, setForm, setConfirmSuccess);
                    }}
                    disabled={!form.timing}
                    autoComplete='off'
                    required
                  ></input>
                  <button
                    disabled={confirmSuccess === 2 ? false : true}
                    className={
                      confirmSuccess === 2
                        ? styles['passwordFind-form__inputbutton']
                        : styles['passwordFind-form__inputbuttonYet']
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
              onClick={function (e) {
                e.preventDefault();
                subPasswordGet(form, setEmail, setNow, setSubPassword);
              }}
            >
              비밀번호 찾기
            </button>
          ) : (
            <button className={styles['passwordFind-form__button--submittingYet']}>비밀번호 찾기</button>
          )}
        </div>
      </div>
    </div>
  );
}
