import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { loginSchema } from '@/constants/validationSchema';

import classNames from 'classnames/bind';
import styles from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';

import { login } from '@hooks/useLoginHook.js';

const cn = classNames.bind(styles);

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();

  function onSubmit(userData) {
    login(userData, errors, navigate);
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
            이메일
          </label>
          <div className={styles['login-form__inputSection']}>
            <input
              className={cn(
                'login-form__input',
                errors.loginId?.message ? 'login-form__input--invalid' : null,
                watch('loginId') && 'login-form__input--valid',
              )}
              type='text'
              id='loginId'
              {...register('loginId')}
            />
            <p className={styles['login-form__emailDomain']}>@skuniv.ac.kr</p>
          </div>
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
            autoComplete='off'
            className={cn(
              'login-form__input',
              errors.loginId?.message && 'login-form__input--invalid',
              watch('password') && 'login-form__input--valid',
            )}
            type='password'
            id='password'
            {...register('password')}
          />
          <div className={styles['login-form__result-messageBox']}>
            {errors.password?.message ? (
              <p className={styles['login-form__result-message--error']}>{errors.password.message}</p>
            ) : null}
            <button
              type='button'
              className={styles['passwordFind-button']}
              onClick={function () {
                navigate('/passwordFind');
              }}
            >
              비밀번호 찾기
            </button>
          </div>
        </div>
      </fieldset>

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
