import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { signupSchema } from '@/constants/validationSchema';

import classNames from 'classnames/bind';
import styles from './SignupForm.module.css';
import { useNavigate } from 'react-router-dom'; //
import { APIService } from '../../api/axios.js'; //
import { useState } from 'react';

const cn = classNames.bind(styles);

export default function SignupForm2() {
  //const fullEmail = `${props.email}@skuniv.ac.kr`;
  const fullEmail = 'abcabc1234@skuniv.ac.kr';
  const [signupFalse, setSignupFalse] = useState('');
  const [idValidFalse, setIdValidFalse] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      id: fullEmail,
      part: '',
    },
  });
  const navigate = useNavigate();

  /**
   * 유저 데이터를 서버에 전송하는 함수
   * @param {Object} userData
   * @param {string} userData.id - 아이디
   * @param {string} userData.password - 비밀번호
   * @param {string} userData.password_valid - 비밀번호 확인
   * @param {string} userData.name - 이름
   * @param {string} userData.department - 학과/학부
   * @param {string} userData.strudent_num - 학번
   * @param {string} userData.phone_num - 연락처
   * @param {string} userData.semester - 기수
   * @param {string} userData.part - 파트
   * @returns {Promise}
   */
  async function onSubmit(userData) {
    // 에러 아무것도 없고, 중복검사 확인되었다면
    if (
      errors.id?.message ||
      errors.password?.message ||
      errors.password_valid?.message ||
      errors.name?.message ||
      errors.department?.message ||
      errors.strudent_num?.message ||
      errors.phone_num?.message ||
      idValidFalse
    ) {
      setSignupFalse('회원가입에 실패하였습니다.');
    }

    try {
      const requestData = {
        loginId: userData.id,
        password: userData.password,
        userName: userData.name,
        department: userData.department,
        studentId: userData.strudent_num,
        semester: userData.semester === '' ? 0 : Number(userData.semester),
        phoneNumber: userData.phone_num,
        parts: userData.part,
      };

      const response = await APIService.public.post(import.meta.env.VITE_APP_SIGN_UP, requestData);

      if (response.success) {
        setSignupFalse('');
        navigate('/welcome?name=${form.name}');
      } else {
        setSignupFalse('회원가입에 실패하였습니다.');
      }
    } catch (error) {
      console.log(error);
      setSignupFalse('회원가입 중 서버 오류가 발생했습니다. 나중에 다시 시도해주세요');
    }
  }

  // 이메일 중복 체크 버튼 클릭 // <===================== 미완성
  function handleDuplicateClick(event) {
    event.preventDefault();
    // 이메일 형식 체크는 이미 이전 단계에서 완료되었으므로 생략
    const checkEmailDuplicate = async () => {
      try {
        const response = await APIService.public.post(import.meta.env.VITE_APP_USER_ID_DUPLICATE_CHECK, {
          email: watch('id'),
        });
        // 이미 가입되어있는 이메일 일 경우
        if (response.duplicate) {
          setIdValidFalse('이미 가입된 이메일입니다.');
          return;
        }
        setIdValidFalse('');
      } catch (error) {
        console.log(error);
        setIdValidFalse('이메일 중복 확인 중 오류가 발생했습니다.');
      }
    };
    checkEmailDuplicate();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['signup2-form']}
    >
      <fieldset>
        <legend className={styles['signup2-form__title']}>회원가입</legend>

        <div className={styles['signup2-form__inputbox']}>
          <div className={styles['signup2-form__labelsection']}>
            <label
              className={styles['signup2-form__label']}
              htmlFor='id'
            >
              아이디
            </label>
            <p className={styles['signup2-form__requireMark']}>*</p>
          </div>
          <div className={styles['signup2-form__inputsection']}>
            <input
              className={cn(
                'signup2-form__input',
                errors.id?.message ? 'signup2-form__input--invalid' : null,
                watch('id') && 'signup2-form__input--valid',
              )}
              type='text'
              name='id'
              readOnly
              {...register('id')}
            />
            <button
              className={styles['signup2-form__inputbutton']}
              style={{ cursor: 'pointer' }}
              onClick={handleDuplicateClick}
            >
              중복체크
            </button>
          </div>
          {errors.id?.message ? (
            <p className={styles['signup2-form__result-message--error']}>{errors.id.message}</p>
          ) : idValidFalse !== '' ? (
            <p className={styles['signup2-form__result-message--error']}>{idValidFalse}</p>
          ) : null}
        </div>

        <div className={styles['signup2-form__inputbox']}>
          <div className={styles['signup2-form__labelsection']}>
            <label
              className={styles['signup2-form__label']}
              htmlFor='password'
            >
              비밀번호
            </label>
            <p className={styles['signup2-form__requireMark']}>*</p>
          </div>
          <input
            className={cn(
              'signup2-form__input',
              errors.password?.message && 'signup2-form__input--invalid',
              watch('password') && 'signup2-form__input--valid',
            )}
            type='password'
            name='password'
            placeholder='최소 4자 이상의 영문, 숫자, 특수문자를 포함'
            {...register('password')}
          />
          {errors.password?.message ? (
            <p className={styles['signup2-form__result-message--error']}>{errors.password.message}</p>
          ) : null}
        </div>

        <div className={styles['signup2-form__inputbox']}>
          <div className={styles['signup2-form__labelsection']}>
            <label
              className={styles['signup2-form__label']}
              htmlFor='password_valid'
            >
              비밀번호 확인
            </label>
            <p className={styles['signup2-form__requireMark']}>*</p>
          </div>
          <input
            className={cn(
              'signup2-form__input',
              errors.password_valid?.message && 'signup2-form__input--invalid',
              watch('password_valid') && 'signup2-form__input--valid',
            )}
            type='password'
            name='password_valid'
            placeholder='비밀번호 확인'
            {...register('password_valid')}
          />
          {errors.password_valid?.message ? (
            <p className={styles['signup2-form__result-message--error']}>{errors.password_valid.message}</p>
          ) : null}
        </div>

        <div className={styles['signup2-form__inputbox']}>
          <div className={styles['signup2-form__labelsection']}>
            <label
              className={styles['signup2-form__label']}
              htmlFor='name'
            >
              이름
            </label>
            <p className={styles['signup2-form__requireMark']}>*</p>
          </div>
          <input
            className={cn(
              'signup2-form__input',
              errors.name?.message && 'signup2-form__input--invalid',
              watch('name') && 'signup2-form__input--valid',
            )}
            type='text'
            name='name'
            placeholder='한글로 2-10자'
            {...register('name')}
          />
          {errors.name?.message ? (
            <p className={styles['signup2-form__result-message--error']}>{errors.name.message}</p>
          ) : null}
        </div>

        <div className={styles['signup2-form__inputbox']}>
          <div className={styles['signup2-form__labelsection']}>
            <label
              className={styles['signup2-form__label']}
              htmlFor='department'
            >
              학과/학부
            </label>
            <p className={styles['signup2-form__requireMark']}>*</p>
          </div>
          <input
            className={cn(
              'signup2-form__input',
              errors.department?.message && 'signup2-form__input--invalid',
              watch('department') && 'signup2-form__input--valid',
            )}
            type='text'
            name='department'
            placeholder='본인의 학과/학부'
            {...register('department')}
          />
          {errors.department?.message ? (
            <p className={styles['signup2-form__result-message--error']}>{errors.department.message}</p>
          ) : null}
        </div>

        <div className={styles['signup2-form__inputbox']}>
          <div className={styles['signup2-form__labelsection']}>
            <label
              className={styles['signup2-form__label']}
              htmlFor='strudent_num'
            >
              학번
            </label>
            <p className={styles['signup2-form__requireMark']}>*</p>
          </div>
          <input
            className={cn(
              'signup2-form__input',
              errors.strudent_num?.message && 'signup2-form__input--invalid',
              watch('strudent_num') && 'signup2-form__input--valid',
            )}
            type='text'
            name='strudent_num'
            placeholder='본인의 학번 10자'
            {...register('strudent_num')}
          />
          {errors.strudent_num?.message ? (
            <p className={styles['signup2-form__result-message--error']}>{errors.strudent_num.message}</p>
          ) : null}
        </div>

        <div className={styles['signup2-form__inputbox']}>
          <div className={styles['signup2-form__labelsection']}>
            <label
              className={styles['signup2-form__label']}
              htmlFor='phone_num'
            >
              연락처
            </label>
            <p className={styles['signup2-form__requireMark']}>*</p>
          </div>
          <input
            className={cn(
              'signup2-form__input',
              errors.phone_num?.message && 'signup2-form__input--invalid',
              watch('phone_num') && 'signup2-form__input--valid',
            )}
            type='number'
            name='phone_num'
            placeholder="'-'빼고 숫자로"
            {...register('phone_num')}
          />
          {errors.phone_num?.message ? (
            <p className={styles['signup2-form__result-message--error']}>{errors.phone_num.message}</p>
          ) : null}
        </div>

        <div className={styles['signup2-form__memberbox']}>
          <p className={styles['signup2-form__member']}>
            ! 아래는 멋쟁이사자처럼 동아리에 이미 가입된 부원들만 입력해주세요
          </p>
        </div>
        <div className={styles['signup2-form__inputbox']}>
          <label
            className={styles['signup2-form__label']}
            htmlFor='semester'
          >
            기수
          </label>
          <input
            className={cn(
              'signup2-form__input',
              errors.semester?.message && 'signup2-form__input--invalid',
              watch('semester') && 'signup2-form__input--valid',
            )}
            type='number'
            name='semester'
            placeholder='기수를 적어주세요'
            {...register('semester')}
          />
        </div>

        <div className={styles['signup2-form__inputbox']}>
          <label
            className={styles['signup2-form__label']}
            htmlFor='part'
          >
            파트
          </label>
          <select
            className={styles['signup2-form__partSelect']}
            {...register('part')}
          >
            <option
              className={styles['signup2-form__partOption']}
              value=''
            >
              선택
            </option>
            <option
              className={styles['signup2-form__partOption']}
              value='front'
            >
              프론트앤드
            </option>
            <option
              className={styles['signup2-form__partOption']}
              value='back'
            >
              백앤드
            </option>
            <option
              className={styles['signup2-form__partOption']}
              value='PM/design'
            >
              기획/디자인
            </option>
          </select>
        </div>
      </fieldset>

      {signupFalse ? (
        <div className={styles['signup2-form__falseBox']}>
          <p className={styles['signup2-form__false-message']}>{signupFalse}</p>
        </div>
      ) : null}
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
