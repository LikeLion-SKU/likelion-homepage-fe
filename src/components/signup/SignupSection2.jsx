import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignupSection.module.css';
import { handleInputChange } from '@utils/inputOnChange.js';
import ConsentTable from './ConsentTable';

import { handleSelectBox, handleBlurSelcetBox, handlePart } from '@hooks/useSignupDropdownHook.js';
import { handleCheckboxChange, handleSignupClick } from '@hooks/useSignupHook.js';

export default function SignupSection({ email, setSignupSuccess, setNow }) {
  const fullEmail = `${email}@skuniv.ac.kr`;

  const [form, setForm] = useState({
    id: fullEmail,
    id_valid: true,
    password: '',
    password_valid: '',
    name: '',
    department: '',
    strudent_num: '',
    semester: '',
    phone_num: '',
    part: '',
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [isDropdownView, setIsDropdownView] = useState(false);
  const [selcetPart, setSelectPart] = useState('파트 선택');
  const navigate = useNavigate();

  return (
    <div className={styles['signup-form']}>
      <p className={styles['signup-form__title']}>회원가입</p>
      <div className={styles['signup-form__inputboxs']}>
        <div className={styles['signup-form__inputbox']}>
          <div className={styles['signup-form__labelsection']}>
            <label htmlFor='id'>아이디</label>
            <p>*</p>
          </div>
          <div className={styles['signup-form__inputsection']}>
            <div className={styles['signup-form__input']}>
              <input
                type='text'
                id='id'
                value={form.id}
                className={`${errors.id ? styles['invalid'] : form.id ? styles['valid'] : ''} cursor-not-allowed bg-gray-100`}
                readOnly
                disabled
                required
              ></input>
            </div>
            {errors.id ? <p className={styles.error_message}>{errors.id}</p> : null}
          </div>
        </div>
        <div className={styles['signup-form__inputbox']}>
          <div className={styles['signup-form__labelsection']}>
            <label htmlFor='password'>비밀번호</label>
            <p>*</p>
          </div>
          <div className={styles['signup-form__inputsection']}>
            <div className={styles['signup-form__input']}>
              <input
                type='password'
                placeholder='영문, 숫자, 특수문자를 포함한 최소 8자 이상을 입력해주세요'
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
        <div className={styles['signup-form__inputbox']}>
          <div className={styles['signup-form__labelsection']}>
            <label htmlFor='password_valid'>비밀번호 확인</label>
            <p>*</p>
          </div>
          <div className={styles['signup-form__inputsection']}>
            <div className={styles['signup-form__input']}>
              <input
                type='password'
                placeholder='비밀번호를 다시 입력해주세요'
                id='password_valid'
                value={form.password_valid}
                className={errors.password_valid ? styles['invalid'] : form.password_valid ? styles['valid'] : ''}
                onChange={handleInputChange(setForm)}
                autoComplete='off'
                required
              ></input>
            </div>
            {errors.password_valid ? <p className={styles.error_message}>{errors.password_valid}</p> : null}
          </div>
        </div>
        <div className={styles['signup-form__inputbox']}>
          <div className={styles['signup-form__labelsection']}>
            <label htmlFor='name'>이름</label>
            <p>*</p>
          </div>
          <div className={styles['signup-form__inputsection']}>
            <div className={styles['signup-form__input']}>
              <input
                type='text'
                placeholder='한글로 입력해주세요'
                id='name'
                value={form.name}
                className={errors.name ? styles['invalid'] : form.name ? styles['valid'] : ''}
                onChange={handleInputChange(setForm)}
                autoComplete='off'
                required
              ></input>
            </div>
            {errors.name ? <p className={styles.error_message}>{errors.name}</p> : null}
          </div>
        </div>
        <div className={styles['signup-form__inputbox']}>
          <div className={styles['signup-form__labelsection']}>
            <label htmlFor='department'>학과/학부</label>
            <p>*</p>
          </div>
          <div className={styles['signup-form__inputsection']}>
            <div className={styles['signup-form__input']}>
              <input
                type='text'
                placeholder='한글로 입력해주세요'
                id='department'
                value={form.department}
                className={errors.department ? styles['invalid'] : form.department ? styles['valid'] : ''}
                onChange={handleInputChange(setForm)}
                autoComplete='off'
                required
              ></input>
            </div>
            {errors.department ? <p className={styles.error_message}>{errors.department}</p> : null}
          </div>
        </div>
        <div className={styles['signup-form__inputbox']}>
          <div className={styles['signup-form__labelsection']}>
            <label htmlFor='strudent_num'>학번</label>
            <p>*</p>
          </div>
          <div className={styles['signup-form__inputsection']}>
            <div className={styles['signup-form__input']}>
              <input
                type='text'
                maxLength={10}
                placeholder='숫자만 10자 입력해주세요'
                id='strudent_num'
                value={form.strudent_num}
                className={errors.strudent_num ? styles['invalid'] : form.strudent_num ? styles['valid'] : ''}
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.strudent_num ? <p className={styles.error_message}>{errors.strudent_num}</p> : null}
          </div>
        </div>
        <div className={styles['signup-form__inputbox']}>
          <div className={styles['signup-form__labelsection']}>
            <label htmlFor='phone_num'>연락처</label>
            <p>*</p>
          </div>
          <div className={styles['signup-form__inputsection']}>
            <div className={styles['signup-form__input']}>
              <input
                type='text'
                placeholder='- 빼고 입력 ex) 01012345678'
                id='phone_num'
                value={form.phone_num}
                className={errors.phone_num ? styles['invalid'] : form.phone_num ? styles['valid'] : ''}
                onChange={handleInputChange(setForm)}
                autoComplete='off'
                required
              ></input>
            </div>
            {errors.phone_num ? <p className={styles.error_message}>{errors.phone_num}</p> : null}
          </div>
        </div>

        <div className={styles['signup-form__inputbox']}>
          <div className={styles['signup-form__labelsection']}>
            <label htmlFor='semester'>기수 (기존 동아리원만 선택)</label>
          </div>
          <div className={styles['signup-form__inputsection']}>
            <div className={styles['signup-form__input']}>
              <input
                type='text'
                placeholder='숫자만 입력해주세요'
                id='semester'
                value={form.semester}
                className={errors.semester ? styles['invalid'] : form.semester ? styles['valid'] : ''}
                autoComplete='off'
                onChange={handleInputChange(setForm)}
              ></input>
            </div>
            {errors.semester ? <p className={styles.error_message}>{errors.semester}</p> : null}
          </div>
        </div>

        <div className={styles['signup-form__inputbox']}>
          <div className={styles['signup-form__labelsection']}>
            <label htmlFor='part'>파트 (기존 동아리원만 선택)</label>
          </div>
          <div
            className={styles['signup-form__inputsection']}
            onBlur={handleBlurSelcetBox(setIsDropdownView)}
          >
            <div className={styles['signup-form__selectsection']}>
              <label
                className={styles['signup-form__selectLabel']}
                onClick={function (event) {
                  handleSelectBox(event, isDropdownView, setIsDropdownView);
                }}
              >
                <button
                  id='part'
                  style={{ cursor: 'pointer' }}
                  className={
                    selcetPart !== '파트 선택'
                      ? styles['signup-form__selectbutton-valid']
                      : styles['signup-form__selectbutton']
                  }
                  value={selcetPart}
                >
                  <p>{selcetPart}</p>
                  <p>{isDropdownView ? '▲' : '▼'}</p>
                </button>
              </label>
            </div>
            {isDropdownView ? (
              <ul
                style={{ cursor: 'pointer' }}
                className={styles['signup-form__selectMenu']}
              >
                <li
                  className={
                    selcetPart === '기획/디자인'
                      ? styles['signup-form__selectionSelected']
                      : styles['signup-form__selection']
                  }
                  id='PM/design'
                  onClick={function (event) {
                    handlePart(event, form, setForm, setSelectPart);
                  }}
                >
                  기획/디자인
                </li>
                <li
                  id='front'
                  className={
                    selcetPart === '프론트앤드'
                      ? styles['signup-form__selectionSelected']
                      : styles['signup-form__selection']
                  }
                  onClick={function (event) {
                    handlePart(event, form, setForm, setSelectPart);
                  }}
                >
                  프론트앤드
                </li>
                <li
                  id='back'
                  className={
                    selcetPart === '백앤드'
                      ? styles['signup-form__selectionSelected']
                      : styles['signup-form__selection']
                  }
                  onClick={function (event) {
                    handlePart(event, form, setForm, setSelectPart);
                  }}
                >
                  백앤드
                </li>
              </ul>
            ) : null}
            {errors.part ? <p className={styles.error_message}>{errors.part}</p> : null}
          </div>
        </div>

        <div className={styles['signup-form__inputbox_consent']}>
          <div className={styles['signup-form__labelsection']}>
            <input
              type='checkbox'
              id='consent'
              checked={form.consent}
              className={errors.consent ? styles['invalid'] : form.consent ? styles['valid'] : ''}
              onChange={function (event) {
                handleCheckboxChange(event, form, setForm);
              }}
            ></input>
            <label htmlFor='consent'>(필수) 개인정보 수집 및 이용 동의서</label>
            <p>*</p>
          </div>
          <div className={styles['signup-form__inputsection']}>
            <ConsentTable />
            {errors.consent ? <p className={styles.error_message}>{errors.consent}</p> : null}
          </div>
        </div>
        <div className={styles['signup-form__progressBox2']}>
          <button
            style={{ cursor: 'pointer' }}
            className={styles['signup-form__button--submitting']}
            onClick={function (event) {
              handleSignupClick(event, form, setErrors, form, setSignupSuccess, setNow, navigate);
            }}
          >
            회원가입
          </button>
          <div className={styles['login-togoBox']}>
            <p className={styles['login-mention']}>이미 계정이 있으신가요?</p>
            <button
              style={{ cursor: 'pointer' }}
              type='submit'
              className={styles['login-button']}
              onClick={function () {
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
