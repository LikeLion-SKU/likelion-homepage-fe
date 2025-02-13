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

// 숫자만 입력받기
export function handleInputChangeNumber(setState) {
  return function (event) {
    const filteredValue = event.target.value.replace(/[^0-9]/g, '');
    const { id } = event.target;

    setState(function (prev) {
      return {
        ...prev,
        [id]: filteredValue,
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
