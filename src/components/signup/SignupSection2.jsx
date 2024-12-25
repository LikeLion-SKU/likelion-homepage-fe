import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignupSection.module.css';
import { handleIdchecking, handleSignup } from '../../utils/register.js';
import { handleInputChange } from '../../utils/inputOnChange.js';
import { APIService } from '../../api/axios.js';

export default function SignupSection({ email, setSignupSuccess, setNow }) {
  const fullEmail = `${email}@skuniv.ac.kr`;

  const [form, setForm] = useState({
    id: fullEmail,
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

  // email이 변경될 때마다 form의 id 업데이트
  useEffect(() => {
    setForm((prev) => ({ ...prev, id: `${email}@skuniv.ac.kr` }));
  }, [email]);

  // 이메일 중복 체크 버튼 클릭 //
  function handleDuplicateClick(event) {
    event.preventDefault();

    // 이메일 형식 체크는 이미 이전 단계에서 완료되었으므로 생략
    const checkEmailDuplicate = async () => {
      try {
        const response = await APIService.public.post(import.meta.env.VITE_APP_USER_ID_DUPLICATE_CHECK, {
          email: form.id,
        });
        // 이미 가입되어있는 이메일 일 경우
        if (response.duplicate) {
          setErrors({ ...errors, id: '이미 가입된 이메일입니다.' });
          return;
        }
        setForm({ ...form, id_valid: true });
        setErrors({ ...errors, id: '' });
      } catch (error) {
        setErrors({ ...errors, id: '이메일 중복 확인 중 오류가 발생했습니다.' });
      }
    };

    checkEmailDuplicate();
  }

  // 회원가입 버튼 클릭 //
  function handleSignupClick(event) {
    event.preventDefault();

    const isValid = handleSignup(setErrors, form);
    if (isValid && form.id_valid) {
      const signUp = async () => {
        try {
          const requestData = {
            loginId: form.id,
            password: form.password,
            userName: form.name,
            department: form.department,
            studentId: form.strudent_num,
            semester: form.semester === '' ? 0 : Number(form.semester),
            phoneNumber: form.phone_num,
            parts: form.part,
          };

          const response = await APIService.public.post(import.meta.env.VITE_APP_SIGN_UP, requestData);

          if (response.success) {
            setSignupSuccess(true);
            setNow(1);
            navigate('/welcome');
          } else {
            setErrors({ ...errors, signup: '회원가입에 실패하였습니다.' });
          }
        } catch (error) {
          setErrors({ ...errors, signup: '회원가입 중 서버 오류가 발생했습니다. 나중에 다시 시도해주세요' });
        }
      };

      signUp();
    } else if (!form.id_valid) {
      setErrors({ ...errors, id: '이메일 중복 확인이 필요합니다.' });
    }
  }

  return (
    <div className={styles.SignupPage_layout}>
      <div name='Signup_input_information'>
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
                type='text'
                name='id'
                value={form.id}
                className={`${errors.id ? 'invalid' : form.id ? 'valid' : ''} cursor-not-allowed bg-gray-100`}
                readOnly
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
              <p className={styles.ok_message}>아이디를 사용하실 수 있습니다.</p>
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
                type='password'
                placeholder='최소 4자 이상의 영문, 숫자, 특수문자를 포함'
                name='password'
                value={form.password}
                className={errors.password ? 'invalid' : form.password ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.password && <p className={styles.error_message}>{errors.password}</p>}
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
                type='password'
                placeholder='비밀번호 확인'
                name='password_valid'
                value={form.password_valid}
                className={errors.password_valid ? 'invalid' : form.password_valid ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.password_valid && <p className={styles.error_message}>{errors.password_valid}</p>}
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
                type='text'
                placeholder='한글로 2-10자'
                name='name'
                value={form.name}
                className={errors.name ? 'invalid' : form.name ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.name && <p className={styles.error_message}>{errors.name}</p>}
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
                type='text'
                placeholder='본인의 학과/학부'
                name='department'
                value={form.department}
                className={errors.department ? 'invalid' : form.department ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.department && <p className={styles.error_message}>{errors.department}</p>}
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
                type='text'
                maxLength={10}
                placeholder='본인의 학번 10자'
                name='strudent_num'
                value={form.strudent_num}
                className={errors.strudent_num ? 'invalid' : form.strudent_num ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.strudent_num && <p className={styles.error_message}>{errors.strudent_num}</p>}
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
                type='text'
                placeholder="'-'빼고 숫자로"
                name='phone_num'
                value={form.phone_num}
                className={errors.phone_num ? 'invalid' : form.phone_num ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.phone_num && <p className={styles.error_message}>{errors.phone_num}</p>}
          </div>
        </div>

        <p className={styles.line}>! 아래는 멋쟁이사자처럼 동아리에 이미 가입된 부원들만 입력해주세요</p>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label>기수</label>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type='text'
                placeholder='기수를 적어주세요'
                name='semester'
                value={form.semester}
                className={errors.semester ? 'invalid' : form.semester ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
              ></input>
            </div>
            {errors.semester && <p className={styles.error_message}>{errors.semester}</p>}
          </div>
        </div>

        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label>파트</label>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Select}>
              <select
                name='part'
                className={styles.selection}
                value={form.part}
                onChange={handleInputChange(setForm)}
              >
                <option value=''>선택</option>
                <option value='front'>프론트앤드</option>
                <option value='back'>백앤드</option>
                <option value='PM/design'>기획/디자인</option>
              </select>
            </div>
            {errors.part && <p className={styles.error_message}>{errors.part}</p>}
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
              type='submit'
              className={styles.tologinBtn}
              onClick={() => {
                navigate('/login');
              }}
            >
              로그인
            </button>
          </div>
          {errors.signup && <p className={styles.error_message_false}>{errors.signup}</p>}
        </div>
      </div>
    </div>
  );
}
