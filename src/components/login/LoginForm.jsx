import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { loginSchema } from '@/constants/validationSchema';

import classNames from 'classnames/bind';
import styles from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';
import { APIService } from '../../api/axios.js';
import { useState } from 'react';

const cn = classNames.bind(styles);

export default function LoginForm() {
  const [loginFalse, setLoginFalse] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();

  /**
   * 유저 데이터를 서버에 전송하는 함수
   * @param {Object} userData
   * @param {string} userData.loginId - 유저 아이디
   * @param {string} userData.password - 유저 비밀번호
   * @returns {Promise}
   */
  async function onSubmit(userData) {
    if (errors.loginId?.message || errors.password?.message) {
      setLoginFalse(true);
    } else {
      try {
        const requestData = {
          loginId: userData.loginId,
          password: userData.password,
        };

        const response = await APIService.public.post(import.meta.env.VITE_APP_LOGIN, requestData);
        // 토큰 저장
        localStorage.setItem('access', response.accessToken);
        localStorage.setItem('refresh', response.refreshToken);
        setLoginFalse(false);

        // 홈화면으로 이동
        navigate('/');
      } catch (error) {
        setLoginFalse(true);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['login-form']}
    >
      <fieldset>
        <legend className={styles['login-form__title']}>로그인</legend>

        <div className={styles['login-form__inputbox']}>
          <label
            className={styles['login-form__label']}
            htmlFor='loginId'
          >
            아이디
          </label>
          <input
            className={cn(
              'login-form__input',
              errors.loginId?.message ? 'login-form__input--invalid' : null,
              watch('loginId') && 'login-form__input--valid',
            )}
            type='text'
            name='loginId'
            {...register('loginId')}
          />
          {errors.loginId?.message ? (
            <p className={styles['login-form__result-message--error']}>{errors.loginId.message}</p>
          ) : null}
        </div>

        <div className={styles['login-form__inputbox']}>
          <label
            className={styles['login-form__label']}
            htmlFor='password'
          >
            비밀번호
          </label>
          <input
            className={cn(
              'login-form__input',
              errors.loginId?.message && 'login-form__input--invalid',
              watch('password') && 'login-form__input--valid',
            )}
            type='password'
            name='password'
            {...register('password')}
          />
          {errors.password?.message ? (
            <p className={styles['login-form__result-message--error']}>{errors.password.message}</p>
          ) : null}
        </div>
      </fieldset>

      {loginFalse ? (
        <div className={styles['login-form__falseBox']}>
          <p className={styles['login-form__false-message']}>
            ID 또는 비밀번호가 잘못 되었습니다. 정확히 입력해주세요.
          </p>
        </div>
      ) : null}
      <button
        className={cn('button', isSubmitting && 'button--submitting')}
        type='submit'
        disabled={isSubmitting}
      >
        로그인
      </button>
    </form>
  );
}
