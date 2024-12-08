

export function validateInput(id, password) {
    console.log("id : " + id);
    console.log("password : " + password);
    let errors = {
      id: '',
      password: ''
    };
  
    if (id === '') {
      errors.id = '아이디를 입력해주세요';
      console.log("id틀");
    } 
  
    if (password === '') {
      errors.password = '비밀번호를 입력해주세요';
      console.log("비번틀");
    } 
  
    return errors;  
  }
  
  export function handleLogin(setErrors, id, password) {
    const errors = validateInput(id, password);
    setErrors(errors);
    if (errors.id || errors.password) {
      console.log('로그인 실패: 유효성 검사에 실패했습니다.');
      return false; 
    }
    return true;  
  }


