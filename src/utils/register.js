
// 회원가입 유효성 검사 함수 //

// 유효성 검사 정규식
const inputRegexs = {
    idRegex: /^[a-zA-Z0-9]{2,18}$/,
    pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
    nameRegex: /^[가-힣]{2,10}$/,
    departRegex: /^[가-힣]+$/,
    student_numRegex: /^[0-9]{10}$/,
    phoneNumberRegex: /^0-9{8,12}$/,
};

// 아이디 중복 검사 버튼 클릭시
export function validateInput_idDuplicate(form) {
    let errors = {
        id: '',
        password: '',
        password_valid: '',
        name: '',
        department: '',
        semester: '',
        phone_num: '',
        part: '',
    };
  
    if (form.id === '') {
      errors.id = "아이디는 필수 입력 항목입니다.";
    } else if (!inputRegexs.idRegex.test(form.id)) {
      errors.id = "아이디는 영문, 숫자로 2~18자여야 합니다.";
    }
    return errors;  
  }

  export function handleIdchecking(setErrors, form) {
    const errors = validateInput_idDuplicate(form);
    setErrors(errors);
    if (errors.id ) {
      return false;
    }
    return true;  
  }

  // 인증번호 전송 버튼 클릭시
  export function validateInput_email(form) {
    let errors = {
        id: '',
        password: '',
        password_valid: '',
        name: '',
        department: '',
        semester: '',
        phone_num: '',
        part: '',
    };
  
    if (form.email === '') {
      errors.email = "이메일은 필수 입력 항목입니다.";
    } 
    return errors;  
  }

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
    };
  
    if (form.confirmCode === '') {
      errors.confirmCode = "인증번호를 입력해주세요."; 
    } 
    return errors; 
  }

  export function handleConfirmCodechecking(setErrors, form) {

    const errors = validateInput_confirmCode(form);
    setErrors(errors);
    if (errors.confirmCode ) {
      return false;
    }
    return true;  
  }


// 회원가입 버튼 클릭시
export function validateInput_signup(form) {
    let errors = {
        id: '',
        password: '',
        password_valid: '',
        name: '',
        department: '',
        semester: '',
        phone_num: '',
        part: '',
    };
  
    if (form.id === '') {
      errors.id = "아이디는 필수 입력 항목입니다.";
    } else if (!inputRegexs.idRegex.test(form.id)) {
      errors.id = "아이디는 영문, 숫자로 2~18자여야 합니다.";
    }
  
    if (form.password === '') {
      errors.password = "비밀번호는 필수 입력 항목입니다.";
    } else if (!inputRegexs.pwRegex.test(form.password)) {
      errors.password = "비밀번호는 최소 8자 이상의 영문, 숫자, 특수문자를 포함해야 합니다.";
    }

    if (form.password_valid === '') {
        errors.password_valid = "비밀번호 확인은 필수 입력 항목입니다.";
      } else if (form.password_valid !== form.password) {
        errors.password_valid = "비밀번호와 다릅니다.";
      }

      if (form.name === '') {
        errors.name = "이름은 필수 입력 항목입니다.";
      } else if (!inputRegexs.nameRegex.test(form.name)) {
        errors.name = "이름은 한글로 입력해야 합니다.";
      }

      if (form.department === '') {
        errors.department = "학과는 필수 입력 항목입니다.";
      } else if (!inputRegexs.departRegex.test(form.department)) {
        errors.department = "이름은 한글로 입력해야 합니다.";
      }

      if (form.strudent_num === '') {
        errors.strudent_num = "학번은 필수 입력 항목입니다.";
      } else if (!inputRegexs.student_numRegex.test(form.strudent_num)) {
        errors.strudent_num = "학번은 숫자 10자로 입력해야 합니다.";
      }

      if (form.phone_num === '') {
        errors.phone_num = "연락처는 필수 입력 항목입니다.";
      } else if (!inputRegexs.phoneNumberRegex.test(form.phone_num)) {
        errors.phone_num = "연락처는 숫자 8~12자로 입력해야 합니다.";
      }

    return errors; 
  }

  export function handleSignup(setErrors, form) {

    const errors = validateInput_signup(form);
    setErrors(errors);
    if (errors.id || errors.password || errors.password_valid ||  errors.name || 
        errors.department || errors.strudent_num || errors.phone_num ) {
      return false; 
    }
    return true; 
  }


