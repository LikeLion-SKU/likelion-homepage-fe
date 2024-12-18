import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignupSection.module.css';
import { handleIdchecking, handleSignup } from '../../utils/register.js';
import { handleInputChange } from '../../utils/inputOnChange.js';

export default function SignupSection(props) {
  const [form, setForm] = useState({
    id: '',
    id_valid: false,
    password: '',
    password_valid: '',
    name: '',
    department: '',
    strudent_num: '',
    semester: '',
    phone_num: '',
    part: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 아이디 중복 체크 버튼 클릭 //
  function handleDuplicateClick(event) {
    event.preventDefault();

    const isValid = handleIdchecking(setErrors, form, errors);
    if (isValid) {
      setForm({ ...form, id_valid: true });
    }
  }

  // 회원가입 버튼 클릭 //
  function handleSignupClick(event) {
    event.preventDefault();

    const isValid = handleSignup(setErrors, form);
    if (isValid && form.id_valid) {
      if (form.semester === '') {
        setForm({ ...form, semester: 0 });
      }
      // setErrors({...form, signup: "회원가입에 실패 하였습니다"}) // 회원가입 실패시
      // 회원가입 성공시
      props.setSignupSuccess(true);
      props.setNow(1);
      navigate('/welcome');
    }
  }

  return (
    <div className={styles.SignupPage_layout}>
      <div name="Signup_input_information">
        <p className={styles.title}>회원가입</p>
      </div>
      <div className={styles.Signup_input_boxs}>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label>아이디</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type="text"
                placeholder="영문, 숫자로 2-18자"
                name="id"
                value={form.id}
                className={errors.id ? 'invalid' : form.id ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
                required
              ></input>
              <button
                style={{ cursor: 'pointer' }}
                className={styles.checkingBtn}
                onClick={handleDuplicateClick}
              >
                중복확인
              </button>
            </div>
            {errors.id ? (
              <p className={styles.error_message}>{errors.id}</p>
            ) : form.id_valid ? (
              <p className={styles.ok_message}>
                아이디를 사용하실 수 있습니다.
              </p>
            ) : null}
          </div>
        </div>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label>비밀번호</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type="password"
                placeholder="최소 8자 이상의 영문, 숫자, 특수문자를 포함"
                name="password"
                value={form.password}
                className={
                  errors.password ? 'invalid' : form.password ? 'valid' : ''
                }
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.password && (
              <p className={styles.error_message}>{errors.password}</p>
            )}
          </div>
        </div>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label>비밀번호 확인</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type="password"
                placeholder="비밀번호 확인"
                name="password_valid"
                value={form.password_valid}
                className={
                  errors.password_valid
                    ? 'invalid'
                    : form.password_valid
                      ? 'valid'
                      : ''
                }
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.password_valid && (
              <p className={styles.error_message}>{errors.password_valid}</p>
            )}
          </div>
        </div>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label>이름</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type="text"
                placeholder="한글로 2-10자"
                name="name"
                value={form.name}
                className={errors.name ? 'invalid' : form.name ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.name && (
              <p className={styles.error_message}>{errors.name}</p>
            )}
          </div>
        </div>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label>학과/학부</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type="text"
                placeholder="본인의 학과/학부"
                name="department"
                value={form.department}
                className={
                  errors.department ? 'invalid' : form.department ? 'valid' : ''
                }
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.department && (
              <p className={styles.error_message}>{errors.department}</p>
            )}
          </div>
        </div>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label>학번</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type="text"
                maxLength={10}
                placeholder="본인의 학번 10자"
                name="strudent_num"
                value={form.strudent_num}
                className={
                  errors.strudent_num
                    ? 'invalid'
                    : form.strudent_num
                      ? 'valid'
                      : ''
                }
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.strudent_num && (
              <p className={styles.error_message}>{errors.strudent_num}</p>
            )}
          </div>
        </div>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label>연락처</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type="text"
                placeholder="'-'빼고 숫자로"
                name="phone_num"
                value={form.phone_num}
                className={
                  errors.phone_num ? 'invalid' : form.phone_num ? 'valid' : ''
                }
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.phone_num && (
              <p className={styles.error_message}>{errors.phone_num}</p>
            )}
          </div>
        </div>

        <p className={styles.line}>
          ! 아래는 멋쟁이사자처럼 동아리에 이미 가입된 부원들만 입력해주세요
        </p>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label>기수</label>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type="text"
                placeholder="기수를 적어주세요"
                name="semester"
                value={form.semester}
                className={
                  errors.semester ? 'invalid' : form.semester ? 'valid' : ''
                }
                onChange={handleInputChange(setForm)}
              ></input>
            </div>
            {errors.semester && (
              <p className={styles.error_message}>{errors.semester}</p>
            )}
          </div>
        </div>

        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label>파트</label>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Select}>
              <select
                name="part"
                className={styles.selection}
                value={form.part}
                onChange={handleInputChange(setForm)}
              >
                <option value="">선택</option>
                <option value="front">프론트앤드</option>
                <option value="back">백앤드</option>
                <option value="PM/design">기획/디자인</option>
              </select>
            </div>
            {errors.part && (
              <p className={styles.error_message}>{errors.part}</p>
            )}
          </div>
        </div>
        <div className={styles.Signup_progress_box2}>
          <button
            style={{ cursor: 'pointer' }}
            className={styles.SignupBtn}
            onClick={handleSignupClick}
          >
            회원가입
          </button>
          <div className={styles.toLogin}>
            <p>이미 계정이 있으신가요?</p>
            <button
              style={{ cursor: 'pointer' }}
              type="submit"
              className={styles.tologinBtn}
              onClick={() => {
                navigate('/login');
              }}
            >
              로그인
            </button>
          </div>
          {errors.signup && (
            <p className={styles.error_message_false}>{errors.signup}</p>
          )}
        </div>
      </div>
    </div>
  );
}
