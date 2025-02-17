import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  loginId: yup.string().required('아이디를 입력해주세요'),
  password: yup.string().required('비밀번호를 입력해주세요'),
});

export const passwordChangeSchema = yup.object().shape({
  password: yup.string().required('현재 비밀번호를 입력해주세요.'),
  newpassword: yup
    .string()
    .required('새 비밀번호를 입력해주세요')
    .matches(/^(?!.*\s).*$/, '비밀번호는 띄어쓰기를 포함할 수 없습니다.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
      '최소 8자 이상의 영문, 숫자, 특수문자(!@#$%^&*()_+)를 포함해주세요.',
    ),
  newpassword_valid: yup
    .string()
    .required('새 비밀번호 확인을 입력해주세요')
    .oneOf([yup.ref('newpassword'), null], '새 비밀번호와 일치하지 않습니다.'),
});
