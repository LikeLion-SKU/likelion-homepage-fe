import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  loginId: yup.string().required('아이디를 입력해주세요'),
  password: yup.string().required('비밀번호를 입력해주세요'),
});

export const passwordChangeSchema = yup.object().shape({
  password: yup.string().required('현재 비밀번호를 입력해주세요'),
  newpassword: yup
    .string()
    .required('새 비밀번호를 입력해주세요')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[@#$%^&+=!])(?!.*\s).{4,}$/,
      '띄어쓰기를 제외하고 최소 8자 이상의 영문, 숫자, 특수문자를 포함해야 합니다.',
    ),
  newpassword_valid: yup
    .string()
    .required('새 비밀번호 확인을 입력해주세요')
    .oneOf([yup.ref('newpassword'), null], '새 비밀번호와 일치하지 않습니다'),
});

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .required('이메일을 입력해주세요')
    .matches(/^[a-zA-Z0-9._-]+$/, '올바른 이메일 형식이 아닙니다.'),
  confirmCode: yup.string().required('인증번호를 입력해주세요'),
  id: yup
    .string()
    .required('아이디를 입력해주세요')
    .matches(/^[a-zA-Z0-9._-]+@skuniv\.ac\.kr$/, '아이디는 영문, 숫자이어야 합니다.'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[@#$%^&+=!])(?!.*\s).{4,}$/,
      '비밀번호는 최소 4자 이상의 영문, 숫자, 특수문자를 포함해야 합니다.',
    ),
  password_valid: yup
    .string()
    .required('비밀번호 확인을 입력해주세요')
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다'),
  name: yup
    .string()
    .required('이름을 입력해주세요')
    .matches(/^[가-힣]{2,10}$/, '이름은 한글로 입력해야 합니다.'),
  department: yup
    .string()
    .required('학과/학부를 입력해주세요')
    .matches(/^[가-힣]+$/, '학과/학부는 한글로 입력해야 합니다.'),
  strudent_num: yup
    .string()
    .required('학번을 입력해주세요')
    .matches(/^[0-9]{10}$/, '학번은 숫자 10자로 입력해야 합니다.'),
  phone_num: yup
    .string()
    .required('연락처를 입력해주세요')
    .matches(/^[0-9]{8,12}$/, '연락처는 숫자 8~12자로 입력해야 합니다.'),
});
