import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordChangeSchema } from '@/constants/validationSchema';

import classNames from 'classnames/bind';
import styles from './PasswordChangeForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

import { handlePasswordChangeClick } from '@hooks/usePasswordChangeHook';

const cn = classNames.bind(styles);

export default function PasswordChangeForm() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(passwordChangeSchema),
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');

  function onSubmit(userData) {
    handlePasswordChangeClick(userData, errors, setError, navigate, setIsLoading, token);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['passwordChange-form']}
    >
      <fieldset>
        <legend className={styles['passwordChange-form__title']}>비밀번호 변경</legend>

        <div className={styles['passwordChange-form__inputbox']}>
          <label
            className={styles['passwordChange-form__label']}
            htmlFor='password'
          >
            현재 비밀번호
          </label>
          <div className={styles['passwordChange-form__inputsection']}>
            <input
              className={cn(
                'passwordChange-form__input',
                errors.password?.message ? 'passwordChange-form__input--invalid' : null,
                watch('password') && 'passwordChange-form__input--valid',
              )}
              type='text'
              id='password'
              placeholder='현재 비밀번호를 입력해주세요'
              autoComplete='off'
              {...register('password')}
            ></input>
          </div>
          <div className={styles['passwordChange-form__result-messageBox']}>
            {errors.password?.message ? (
              <p className={styles['passwordChange-form__result-message--error']}>{errors.password?.message}</p>
            ) : null}
          </div>
        </div>
        <div className={styles['passwordChange-form__inputbox']}>
          <label
            className={styles['passwordChange-form__label']}
            htmlFor='newpassword'
          >
            새 비밀번호
          </label>
          <div className={styles['passwordChange-form__inputsection']}>
            <input
              className={cn(
                'passwordChange-form__input',
                errors.newpassword?.message ? 'passwordChange-form__input--invalid' : null,
                watch('newpassword') && 'passwordChange-form__input--valid',
              )}
              type='password'
              id='newpassword'
              placeholder='영문, 숫자, 특수문자를 포함한 최소 8자 이상을 입력해주세요'
              autoComplete='off'
              {...register('newpassword')}
            ></input>
          </div>
          <div className={styles['passwordChange-form__result-messageBox']}>
            {errors.newpassword?.message ? (
              <p className={styles['passwordChange-form__result-message--error']}>{errors.newpassword?.message}</p>
            ) : null}
          </div>
        </div>
        <div className={styles['passwordChange-form__inputbox']}>
          <label
            className={styles['passwordChange-form__label']}
            htmlFor='newpassword_valid'
          >
            새 비밀번호 확인
          </label>
          <div className={styles['passwordChange-form__inputsection']}>
            <input
              className={cn(
                'passwordChange-form__input',
                errors.newpassword_valid?.message ? 'passwordChange-form__input--invalid' : null,
                watch('newpassword_valid') && 'passwordChange-form__input--valid',
              )}
              type='password'
              id='newpassword_valid'
              placeholder='새 비밀번호를 다시 입력해주세요'
              autoComplete='off'
              {...register('newpassword_valid')}
            ></input>
          </div>
          <div className={styles['passwordChange-form__result-messageBox']}>
            {errors.newpassword_valid?.message ? (
              <p className={styles['passwordChange-form__result-message--error']}>
                {errors.newpassword_valid?.message}
              </p>
            ) : null}
          </div>
        </div>
      </fieldset>

      <button
        className={cn('button', isSubmitting && 'button--submitting')}
        type='submit'
        disabled={isSubmitting || isLoading ? true : false}
        style={{ cursor: isLoading ? 'default' : 'pointer' }}
      >
        {isLoading ? (
          <TailSpin
            visible={true}
            height='3rem'
            width='3rem'
            color='#ffffff'
            ariaLabel='tail-spin-loading'
            radius='1'
            wrapperStyle={{}}
            wrapperClass=''
          />
        ) : (
          '비밀번호 변경'
        )}
      </button>
    </form>
  );
}
