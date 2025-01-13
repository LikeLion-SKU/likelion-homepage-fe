import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { loginSchema } from '@/constants/validationSchema';

import classNames from 'classnames/bind';
import styles from './LoginForm.module.css';
//import { useNavigate } from 'react-router-dom'; //
//import { APIService } from '../../api/axios.js'; //

const cn = classNames.bind(styles);

export default function SignupForm1() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  //const navigate = useNavigate();

  /**
   * 유저 데이터를 서버에 전송하는 함수
   * @param {Object} userData
   * @param {string} userData.email - 이메일
   * @param {string} userData.confirmCode - 인증번호
   * @param {Object} nowState
   * @param {Integer} nowState.time - 남은 인증시간
   * @param {boolean} nowState.email_valid - 이메일로 인증번호 전송 성공 여부
   * @param {boolean} nowState.confirmCode_valid - 인증번호 일치 성공 여부
   * @param {boolean} nowState.emailSuccess - 이메일인증 성공 여부
   * @returns {Promise}
   */
  async function onSubmit(userData) {
    // console.log() 삭제 후 로직 작성
    console.log(userData);

    // try {
    //   const requestData = {
    //     loginId: userData.loginId,
    //     password: userData.password,
    //   };

    //   const response = await APIService.public.post(import.meta.env.VITE_APP_AUTH_EMAIL_SEND, requestData);
    //   // 토큰 저장
    //   sessionStorage.setItem('access', response.data.accessToken);
    //   localStorage.setItem('access', response.data.accessToken);
    //   // 홈화면으로 이동
    //   navigate('/');
    // } catch (error) {
    //   // 로그인 실패 시 어디에 출력해야하지?
    //   setErrors((prev) => ({
    //     ...prev,
    //     password: 'ID 또는 비밀번호가 잘못 되었습니다. 정확히 입력해주세요.',
    //   }));
    // }
  }

  // 계속 버튼 클릭 //
  function next(e) {
    e.preventDefault();
    props.setEmail(form.email); // 이메일 값을 상위 컴포넌트로 전달
    props.setNow(2); // 2번째 페이지 보여줌.
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['signup1-form']}
    >
      <fieldset>
        <legend className={styles['signup1-form__title']}>회원가입</legend>

        <div className={styles['signup1-form__inputbox']}>
          <div className={styles['signup1-form__labelsection']}>
            <label
              className={styles['signup1-form__label']}
              htmlFor='email'
            >
              이메일
            </label>
            <p>*</p>
          </div>
          <div className={styles['signup1-form__inputsection']}>
            <input
              className={cn(
                'signup1-form__input',
                errors.email?.message ? 'login-form__input--invalid' : null,
                watch('email') && 'login-form__input--valid',
              )}
              type='text'
              name='email'
              {...register('email')}
            />
            <p> @skuniv.ac.kr </p>
            <button
              className={styles['signup1-form__inputbutton']}
              style={{ cursor: 'pointer' }}
              className={styles.checkingBtn}
              onClick={handleSendingClick}
            >
              인증번호 전송
            </button>
          </div>
          {errors.email?.message ? (
            <p className={styles['login-form__result-message--error']}>{errors.email.message}</p>
          ) : null}
        </div>

        <div className={styles['signup1-form__inputbox']}>
          <div className={['signup1-form__labelsection']}>
            <label
              className={styles['signup1-form__label']}
              htmlFor='confirmCode'
            >
              인증번호
            </label>
          </div>
          <div className={styles['signup1-form__inputsection']}>
            <input
              className={cn(
                'signup1-form__input',
                errors.confirmCode?.message && 'login-form__input--invalid',
                watch('confirmCode') && 'login-form__input--valid',
              )}
              type='text'
              name='confirmCode'
              {...register('confirmCode')}
            />
            <button
              className={styles['signup1-form__inputbutton']}
              style={{ cursor: 'pointer' }}
              className={styles.checkingBtn}
              onClick={handleSendingClick}
            >
              인증번호 확인
            </button>
          </div>
          {errors.confirmCode?.message ? (
            <p className={styles['login-form__result-message--error']}>{errors.confirmCode.message}</p>
          ) : null}
        </div>
      </fieldset>

      <button
        className={cn('button', isSubmitting && 'button--submitting')}
        type='submit'
        disabled={isSubmitting}
      >
        계속
      </button>
    </form>
  );
}
