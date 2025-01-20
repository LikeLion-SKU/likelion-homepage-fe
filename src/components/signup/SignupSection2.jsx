import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignupSection.module.css';
import { handleSignup } from '../../utils/register.js';
import { handleInputChange } from '../../utils/inputOnChange.js';
import { APIService } from '../../api/axios.js';

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
  const [isSelect, setIsSelect] = useState(false);
  const navigate = useNavigate();

  // email이 변경될 때마다 form의 id 업데이트
  useEffect(() => {
    setForm((prev) => ({ ...prev, id: `${email}@skuniv.ac.kr` }));
  }, [email]);

  // 이메일 중복 체크 버튼 클릭 //
  /*
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
      } catch {
        setErrors({ ...errors, id: '이메일 중복 확인 중 오류가 발생했습니다.' });
      }
    };

    checkEmailDuplicate();
  }
  */

  function handleCheckboxChange(event) {
    setForm({ ...form, consent: event.target.checked });
  }

  function handleSelectBox(event) {
    event.preventDefault;
    console.log('트랙 눌림!');
    setIsSelect(!isSelect);
    console.log(isSelect);
  }

  // 회원가입 버튼 클릭 //
  function handleSignupClick(event) {
    event.preventDefault();

    const isValid = handleSignup(setErrors, form);
    if (isValid === true && form.id_valid === true && form.consent === true) {
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
            navigate('/welcome?name=${form.name}');
          } else {
            setErrors({ ...errors, signup: '회원가입에 실패하였습니다.' });
          }
        } catch {
          setErrors({ errors, signup: '회원가입 중 서버 오류가 발생했습니다. 나중에 다시 시도해주세요' });
        }
      };

      signUp();
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
            <label htmlFor='id'>아이디</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type='text'
                id='id'
                value={form.id}
                className={`${errors.id ? 'invalid' : form.id ? 'valid' : ''} cursor-not-allowed bg-gray-100`}
                readOnly
                required
              ></input>
            </div>
            {errors.id ? <p className={styles.error_message}>{errors.id}</p> : null}
          </div>
        </div>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label htmlFor='password'>비밀번호</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type='password'
                placeholder='최소 4자 이상의 영문, 숫자, 특수문자를 포함'
                id='password'
                value={form.password}
                className={errors.password ? 'invalid' : form.password ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
                autoComplete='off'
                required
              ></input>
            </div>
            {errors.password ? <p className={styles.error_message}>{errors.password}</p> : null}
          </div>
        </div>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label htmlFor='password_valid'>비밀번호 확인</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type='password'
                placeholder='비밀번호 확인'
                id='password_valid'
                value={form.password_valid}
                className={errors.password_valid ? 'invalid' : form.password_valid ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
                autoComplete='off'
                required
              ></input>
            </div>
            {errors.password_valid ? <p className={styles.error_message}>{errors.password_valid}</p> : null}
          </div>
        </div>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label htmlFor='name'>이름</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type='text'
                placeholder='한글로 2-10자'
                id='name'
                value={form.name}
                className={errors.name ? 'invalid' : form.name ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.name ? <p className={styles.error_message}>{errors.name}</p> : null}
          </div>
        </div>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label htmlFor='department'>학과/학부</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type='text'
                placeholder='본인의 학과/학부'
                id='department'
                value={form.department}
                className={errors.department ? 'invalid' : form.department ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.department ? <p className={styles.error_message}>{errors.department}</p> : null}
          </div>
        </div>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label htmlFor='strudent_num'>학번</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type='text'
                maxLength={10}
                placeholder='본인의 학번 10자'
                id='strudent_num'
                value={form.strudent_num}
                className={errors.strudent_num ? 'invalid' : form.strudent_num ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.strudent_num ? <p className={styles.error_message}>{errors.strudent_num}</p> : null}
          </div>
        </div>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label htmlFor='phone_num'>연락처</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type='text'
                placeholder="'-'빼고 숫자로"
                id='phone_num'
                value={form.phone_num}
                className={errors.phone_num ? 'invalid' : form.phone_num ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
                required
              ></input>
            </div>
            {errors.phone_num ? <p className={styles.error_message}>{errors.phone_num}</p> : null}
          </div>
        </div>

        <p className={styles.line}>! (선택)항목은 멋쟁이사자처럼 동아리에 이미 가입된 부원들만 입력해주세요</p>
        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label htmlFor='semester'>기수 (선택)</label>
          </div>
          <div className={styles.input_box}>
            <div className={styles.Input}>
              <input
                type='text'
                placeholder='기수를 적어주세요'
                id='semester'
                value={form.semester}
                className={errors.semester ? 'invalid' : form.semester ? 'valid' : ''}
                onChange={handleInputChange(setForm)}
              ></input>
            </div>
            {errors.semester ? <p className={styles.error_message}>{errors.semester}</p> : null}
          </div>
        </div>

        <div className={styles.Signup_input_box}>
          <div className={styles.label_box}>
            <label htmlFor='part'>트랙 (선택)</label>
          </div>
          <div className={styles.input_box}>
            <button
              className={styles.selection}
              value={form.part}
              onClick={handleSelectBox}
            >
              {form.part}
              {isSelect ? '⌃' : '⌄'}
            </button>
            {isSelect ? (
              <ul>
                <li
                  value=''
                  id='part'
                  onClick={handleInputChange(setForm)}
                >
                  선택
                </li>
                <li
                  value='front'
                  id='part'
                  onClick={handleInputChange(setForm)}
                >
                  프론트앤드
                </li>
                <li
                  value='back'
                  id='part'
                  onClick={handleInputChange(setForm)}
                >
                  백앤드
                </li>
                <li
                  value='PM/design'
                  id='part'
                  onClick={handleInputChange(setForm)}
                >
                  기획/디자인
                </li>
              </ul>
            ) : null}
            {errors.part ? <p className={styles.error_message}>{errors.part}</p> : null}
          </div>
        </div>

        <div className={styles.Signup_input_box_}>
          <div className={styles.label_box}>
            <input
              type='checkbox'
              id='consent'
              checked={form.consent}
              className={errors.consent ? 'invalid' : form.consent ? 'valid' : ''}
              onChange={handleCheckboxChange}
            ></input>
            <label htmlFor='consent'>(필수) 개인정보 수집 및 이용 동의서</label>
            <p>*</p>
          </div>
          <div className={styles.input_box}>
            <div className={styles.consent_information_box}>
              <table className={styles.consent_table}>
                <tbody>
                  <tr className={styles.consent_row_}>
                    <th className={styles.consent_head}>수집 목적</th>
                    <td className={styles.consent_body}>
                      재학생(휴학생 포함) 여부 확인, 입부 지원 처리, 지원 내역 및 합격 여부 확인, 지원자 의사 확인 및
                      원활한 의사소통
                    </td>
                  </tr>
                  <tr className={styles.consent_row_}>
                    <th className={styles.consent_head}>필수항목</th>
                    <td className={styles.consent_body}>이름, 연락처, 이메일 주소, 학과, 학번</td>
                  </tr>
                  <tr className={styles.consent_row}>
                    <th className={styles.consent_head}>보유 기간</th>
                    <td className={styles.consent_body}>
                      지원자: 서류 지원 결과 통지일로부터 1개월 동안 보관 후 파기 <br></br>
                      부원: 활동 기간 동안보관하며, 활동 종료 후에도 원활한 운영 및 기록 보관 목적으로 보유할 수 있으며,
                      본인의 요청이 있는 경우 지체 없이 파기
                    </td>
                  </tr>
                </tbody>
              </table>
              <pre className={styles.consent_info}>
                귀하는 개인 정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.<br></br>
                다만, 동의를 거부할 경우 지원 및 입부 절차가 진행되지 않을 수 있음을 알려드립니다.<br></br>
                위의 내용을 충분히 숙지하였으며, 이에 동의합니다.
              </pre>
            </div>
            {errors.consent ? <p className={styles.error_message}>{errors.consent}</p> : null}
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
          {errors.signup ? <p className={styles.error_message_false}>{errors.signup}</p> : null}
        </div>
      </div>
    </div>
  );
}
