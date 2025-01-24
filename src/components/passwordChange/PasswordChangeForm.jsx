import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PasswordChangeForm.module.css';
import { handlePasswordChangeForm } from '../../utils/register.js';
import { handleInputChange } from '../../utils/inputOnChange.js';
import { APIService } from '@api/axios';

export default function PasswordChangeForm() {
  const [form, setForm] = useState({
    password: '',
    newpassword: '',
    newpassword_valid: '',
  });
  const [errors, setErrors] = useState({});
  const [isUserPassword, setIsUserPassword] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // 비밀번호 변경 버튼 클릭 //
  function handlePasswordChangeClick(event) {
    event.preventDefault();
    const isValid = handlePasswordChangeForm(setErrors, form);

    console.log(errors);
    if (form.password === '' && form.newpassword === '' && form.newpassword_valid === '') {
      alert('변경사항이 없습니다.');
    } else {
      passwordCheck();
      if (isValid === true && isUserPassword) {
        passwordChanging();
      }
    }
  }

  // 현재 비밀번호가 DB에 있는 비번이랑 같은지 확인
  async function passwordCheck() {
    if (token) {
      try {
        const response = await APIService.private.get(import.meta.env.VITE_APP_GET_USERINFO, { token });
        console.log(response);
        if (response.isSuccess) {
          if (form.password === response.password) {
            setIsUserPassword(true);
          } else {
            setErrors({
              ...errors,
              password: '비밀번호가 일치하지않습니다.',
            });
          }
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log('비번 회원정보 조회 오류');
        console.log(error);
      }
    }
  }

  // 비밀번호 변경
  async function passwordChanging() {
    try {
      const requestData = {
        currentPassword: form.password,
        newPassword: form.newpassword,
      };

      const response = await APIService.private.put(import.meta.env.VITE_APP_CHANGE_PASSWORD, requestData, { token });

      if (response.isSuccess) {
        console.log('비밀번호 변경 성공!');
        console.log(response.message);
        let gohome = confirm('홈화면으로 이동하시겠습니까?');
        if (gohome) {
          navigate('/home');
        }
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log('비밀번호 변경 오류');
      console.log(error);
    }
  }

  return (
    <div className={styles['passwordChange-form']}>
      <p className={styles['passwordChange-form__title']}>비밀번호 변경</p>
      <div className={styles['passwordChange-form__inputboxs']}>
        <div className={styles['passwordChange-form__inputbox']}>
          <label htmlFor='password'>현재 비밀번호</label>
          <div className={styles['passwordChange-form__inputsection']}>
            <div className={styles['passwordChange-form__input']}>
              <input
                type='text'
                placeholder='현재 비밀번호를 입력해주세요'
                id='password'
                value={form.password}
                className={errors.password ? styles['invalid'] : form.password ? styles['valid'] : ''}
                onChange={handleInputChange(setForm)}
                autoComplete='off'
                required
              ></input>
            </div>
            {errors.password ? <p className={styles.error_message}>{errors.password}</p> : null}
          </div>
        </div>
        <div className={styles['passwordChange-form__inputbox']}>
          <label htmlFor='newpassword'>새 비밀번호</label>
          <div className={styles['passwordChange-form__inputsection']}>
            <div className={styles['passwordChange-form__input']}>
              <input
                type='text'
                placeholder='영문, 숫자, 특수문자를 포함한 최소 8자 이상을 입력해주세요'
                id='newpassword'
                value={form.newpassword}
                className={errors.newpassword ? styles['invalid'] : form.newpassword ? styles['valid'] : ''}
                onChange={handleInputChange(setForm)}
                autoComplete='off'
                required
              ></input>
            </div>
            {errors.newpassword ? <p className={styles.error_message}>{errors.newpassword}</p> : null}
          </div>
        </div>
        <div className={styles['passwordChange-form__inputbox']}>
          <label htmlFor='newpassword_valid'>새 비밀번호 확인</label>
          <div className={styles['passwordChange-form__inputsection']}>
            <div className={styles['passwordChange-form__input']}>
              <input
                type='text'
                placeholder='새 비밀번호를 다시 입력해주세요'
                id='newpassword_valid'
                value={form.newpassword_valid}
                className={errors.newpassword_valid ? styles['invalid'] : form.newpassword_valid ? ['valid'] : ''}
                onChange={handleInputChange(setForm)}
                autoComplete='off'
                required
              ></input>
            </div>
            {errors.newpassword_valid ? <p className={styles.error_message}>{errors.newpassword_valid}</p> : null}
          </div>
        </div>

        <div className={styles['passwordChange-form__progressBox']}>
          <button
            style={{ cursor: 'pointer' }}
            className={styles['passwordChange-form__button--submitting']}
            onClick={handlePasswordChangeClick}
          >
            비밀번호
          </button>
        </div>
      </div>
    </div>
  );
}
