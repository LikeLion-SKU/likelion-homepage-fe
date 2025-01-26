import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PasswordChangeForm.module.css';
import { handlePasswordChangeForm } from '../../utils/register.js';
import { handleInputChange } from '../../utils/inputOnChange.js';

import { passwordChanging } from '../../hooks/usePasswordChangeHook';

export default function PasswordChangeForm() {
  const [form, setForm] = useState({
    password: '',
    newpassword: '',
    newpassword_valid: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // 비밀번호 변경 버튼 클릭 //
  function handlePasswordChangeClick(event) {
    event.preventDefault();
    setErrors({});
    const isValid = handlePasswordChangeForm(setErrors, form);

    if (form.password === '' && form.newpassword === '' && form.newpassword_valid === '') {
      alert('변경사항이 없습니다.');
    } else {
      if (isValid === true) {
        passwordChanging(form, setErrors, navigate, token);
      }
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
                className={errors.newpassword_valid ? styles['invalid'] : form.newpassword_valid ? styles['valid'] : ''}
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
