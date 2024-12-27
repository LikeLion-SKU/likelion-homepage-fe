import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { loginSchema } from '@/constants/validationSchema';

import classNames from 'classnames/bind';
import styles from './LoginForm.module.css';

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

  /**
   * 유저 데이터를 서버에 전송하는 함수
   * @param {Object} userData
   * @param {string} userData.loginId - 유저 아이디
   * @param {string} userData.password - 유저 비밀번호
   * @returns {Promise}
   */
  async function onSubmit(userData) {
    // console.log() 삭제 후 로직 작성
    console.log(userData);
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
