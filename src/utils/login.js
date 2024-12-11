
// 로그인 유효성 검사 
export function validateInput(id, password) {
    let errors = {
      id: '',
      password: ''
    };
  
    if (id === '') {
      errors.id = '아이디를 입력해주세요';
    } 
  
    if (password === '') {
      errors.password = '비밀번호를 입력해주세요';
    } 
  
    return errors;  
  }
  
  export function handleLogin(setErrors, id, password) {
    const errors = validateInput(id, password);
    setErrors(errors);
    if (errors.id || errors.password) {
      return false; 
    }
    return true;  
  }


