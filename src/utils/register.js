// 회원가입 유효성 검사
// 유효성 검사 정규식
const inputRegexs = {
  idRegex: /^[a-zA-Z0-9._-]+@skuniv\.ac\.kr$/,
  pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
  nameRegex: /^[가-힣]{2,4}$/,
  departRegex: /^[가-힣0-9&]{1,15}$/,
  student_numRegex: /^[0-9]{10}$/,
  phoneNumberRegex: /^[0-9]{8,12}$/,
  emailRegex: /^[a-zA-Z0-9._-]+$/,
  semesterRegex: /^[0-9]{2}$/,
  spaceRegex: /\s/,
};

// 인증번호 전송 버튼 클릭시
export function validateInput_email(form) {
  let errors = {
    email: '',
    confirmCode: '',
    id: '',
    password: '',
    password_valid: '',
    name: '',
    department: '',
    semester: '',
    phone_num: '',
    part: '',
    consent: false,
  };

  if (form.email === '') {
    errors.email = '이메일은 필수 입력 항목입니다.';
  } else if (!inputRegexs.emailRegex.test(form.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  return errors;
}

// 이메일 체크 핸들러
export function handleEmailchecking(setErrors, form) {
  const errors = validateInput_email(form);
  setErrors(errors);
  if (errors.email) {
    return false;
  }
  return true;
}

// 인증번호 확인 버튼 클릭시
export function validateInput_confirmCode(form) {
  let errors = {
    id: '',
    password: '',
    password_valid: '',
    name: '',
    department: '',
    semester: '',
    phone_num: '',
    part: '',
    consent: false,
  };

  if (form.confirmCode === '') {
    errors.confirmCode = '인증번호를 입력해주세요.';
  } else if (form.confirmCode.length !== 6) {
    // 인증번호 길이 검사 추가
    errors.confirmCode = '인증번호는 6자리여야 합니다.';
  } else if (!/^\d+$/.test(form.confirmCode)) {
    // 숫자만 허용
    errors.confirmCode = '인증번호는 숫자만 입력 가능합니다.';
  }
  return errors;
}

export function handleConfirmCodechecking(setErrors, form) {
  const errors = validateInput_confirmCode(form);
  setErrors(errors);
  if (errors.confirmCode) {
    return false;
  }
  return true;
}

// 회원가입 버튼 클릭시
export function validateInput_signup(form) {
  let errors = {
    id: '',
    id_valid: '',
    password: '',
    password_valid: '',
    name: '',
    department: '',
    semester: '',
    phone_num: '',
    part: '',
    consent: false,
  };

  if (form.id === '') {
    errors.id = '아이디는 필수 입력 항목입니다.';
  } else if (!inputRegexs.idRegex.test(form.id)) {
    errors.id = '올바른 서경대학교 이메일 형식이 아닙니다.';
  } else if (!form.id_valid) {
    errors.id = '아이디 중복 검사는 필수 입니다.';
  }

  if (form.password === '') {
    errors.password = '비밀번호는 필수 입력 항목입니다.';
  } else if (!inputRegexs.pwRegex.test(form.password)) {
    errors.password = '비밀번호는 최소 8자 이상의 영문, 숫자, 특수문자를 포함해야 합니다.';
  }

  if (form.password_valid === '') {
    errors.password_valid = '비밀번호 확인은 필수 입력 항목입니다.';
  } else if (form.password_valid !== form.password) {
    errors.password_valid = '비밀번호와 다릅니다.';
  }

  if (form.name === '') {
    errors.name = '이름은 필수 입력 항목입니다.';
  } else if (inputRegexs.spaceRegex.test(form.name)) {
    errors.name = '이름은 띄어쓰기를 포함할 수 없습니다.';
  } else if (!inputRegexs.nameRegex.test(form.name)) {
    errors.name = '이름은 한글로 입력해야 합니다.';
  }

  if (form.department === '') {
    errors.department = '학과/학부는 필수 입력 항목입니다.';
  } else if (inputRegexs.spaceRegex.test(form.department)) {
    errors.department = '학과/학부는 띄어쓰기를 포함할 수 없습니다.';
  } else if (!inputRegexs.departRegex.test(form.department)) {
    errors.department = '학과/학부는 한글, 숫자, &만 들어갈 수 있습니다.';
  }

  if (form.strudent_num === '') {
    errors.strudent_num = '학번은 필수 입력 항목입니다.';
  } else if (inputRegexs.spaceRegex.test(form.strudent_num)) {
    errors.strudent_num = '학번은 띄어쓰기를 포함할 수 없습니다.';
  } else if (!inputRegexs.student_numRegex.test(form.strudent_num)) {
    errors.strudent_num = '학번은 숫자 10자로 입력해야 합니다.';
  }

  if (form.phone_num === '') {
    errors.phone_num = '연락처는 필수 입력 항목입니다.';
  } else if (inputRegexs.spaceRegex.test(form.phone_num)) {
    errors.phone_num = '연락처는 띄어쓰기를 포함할 수 없습니다.';
  } else if (!inputRegexs.phoneNumberRegex.test(form.phone_num)) {
    errors.phone_num = '연락처는 숫자로만 8~12자로 입력해야 합니다.';
  }

  if (form.semester === '') {
    errors.semester = '기수는 필수 입력 항목입니다.';
  } else if (form.semester !== '' && !inputRegexs.semesterRegex.test(form.semester)) {
    errors.semester = '기수는 숫자 2자리로 입력해야 합니다.';
  }

  if (form.part === '') {
    errors.part = '파트는 필수 입력 항목입니다.';
  }

  if (!form.consent) {
    errors.consent = '개인정보 수집 및 이용에 동의해야 합니다.';
  }

  return errors;
}

export function handleSignup(setErrors, form) {
  const errors = validateInput_signup(form);
  setErrors(errors);
  if (
    errors.id ||
    errors.password ||
    errors.password_valid ||
    errors.name ||
    errors.department ||
    errors.strudent_num ||
    errors.phone_num ||
    errors.semester ||
    errors.part ||
    errors.consent
  ) {
    return false;
  }
  return true;
}
