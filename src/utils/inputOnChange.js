import { validateInput_signup } from '@utils/register.js';

// input창 onChange()에서 setForm() 해주는 함수 //
export function handleInputChange(setState) {
  return function (event) {
    const { id, value } = event.target; // 입력 필드의 id과 value 추출

    setState(function (prev) {
      return {
        ...prev,
        [id]: value,
      };
    });
  };
}

export function handleInputChangeSignup(setState, setErrors) {
  return function (event) {
    const { id, value } = event.target; // 입력 필드의 id과 value 추출

    // 입력값 업데이트
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prevErrors) => {
      // 기존 errors 상태를 유지하면서 현재 입력된 필드만 검사
      const newErrors = validateInput_signup({ ...prevErrors, [id]: value });

      return {
        ...prevErrors, // 기존 에러 메시지 유지
        [id]: newErrors[id], // 현재 입력 필드의 에러 메시지만 업데이트
      };
    });
  };
}

// 숫자만 입력받기
export function handleInputChangeNumber(setState, setErrors) {
  return function (event) {
    const filteredValue = event.target.value.replace(/[^0-9]/g, '');
    const { id } = event.target;

    // 입력값 업데이트
    setState((prev) => ({
      ...prev,
      [id]: filteredValue,
    }));

    setErrors((prevErrors) => {
      // 기존 errors 상태를 유지하면서 현재 입력된 필드만 검사
      const newErrors = validateInput_signup({ ...prevErrors, [id]: filteredValue });

      return {
        ...prevErrors, // 기존 에러 메시지 유지
        [id]: newErrors[id], // 현재 입력 필드의 에러 메시지만 업데이트
      };
    });
  };
}

// 비밀번호 입력받기
export function handleInputChangePW(setState, setErrors, form) {
  return function (event) {
    const { id, value } = event.target; // 입력 필드의 id과 value 추출

    // 입력값 업데이트
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prevErrors) => {
      // 기존 errors 상태를 유지하면서 현재 입력된 필드만 검사
      const newErrors = validateInput_signup({ ...form, [id]: value });

      // 현재 비밀번호 확인 값이 공백이면 비밀번호만, 아니면 비밀번호 확인도 같이 확인
      if (form.password_valid === '') {
        return {
          ...prevErrors, // 기존 에러 메시지 유지
          [id]: newErrors[id], // 비밀번호 에러 메시지만 업데이트
        };
      } else {
        return {
          ...prevErrors, // 기존 에러 메시지 유지
          [id]: newErrors[id], // 현재 입력 필드의 에러 메시지만 업데이트
          password_valid: newErrors.password_valid, // 비밀번호 확인도 같이 변경
        };
      }
    });
  };
}

// 비밀번호 확인 입력받기
export function handleInputChangePW_valid(setState, setErrors, form) {
  return function (event) {
    const { id, value } = event.target; // 입력 필드의 id과 value 추출

    // 입력값 업데이트
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prevErrors) => {
      // 기존 errors 상태를 유지하면서 현재 입력된 필드만 검사
      const newErrors = validateInput_signup({ ...form, [id]: value });

      return {
        ...prevErrors, // 기존 에러 메시지 유지
        [id]: newErrors[id], // 현재 입력 필드의 에러 메시지만 업데이트
      };
    });
  };
}

// 학과/학부 입력받기
export function handleInputChangeDepartment(setState) {
  return function (event) {
    const filteredValue = event.target.value.replace(/[^가-힣0-9&]/g, '').slice(0, 15);
    const { id } = event.target;

    setState(function (prev) {
      return {
        ...prev,
        [id]: filteredValue,
      };
    });
  };
}

// 이메일 인증 페이지-이메일
export function inputChange(event, setForm, setSetting) {
  event.preventDefault();
  const { id, value } = event.target;

  if (value === '') {
    setSetting(1);
  } else {
    setSetting(2);
  }

  setForm((prev) => ({
    ...prev,
    [id]: value,
  }));
}

// 이메일 인증 페이지-인증번호(숫자만)
export function inputChangeNumber(setForm, setSetting) {
  return function (event) {
    const filteredValue = event.target.value.replace(/[^0-9]/g, '');
    const { id } = event.target;

    if (filteredValue === '') {
      setSetting(1);
    } else {
      setSetting(2);
    }

    setForm(function (prev) {
      return {
        ...prev,
        [id]: filteredValue,
      };
    });
  };
}
