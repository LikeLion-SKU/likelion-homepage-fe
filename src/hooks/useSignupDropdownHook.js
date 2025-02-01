// 파트(part) 드롭아웃 메뉴 관련 함수
export function handleSelectBox(event, isDropdownView, setIsDropdownView) {
  event.preventDefault;
  setIsDropdownView(!isDropdownView);
}

export function handleBlurSelcetBox(setIsDropdownView) {
  setTimeout(() => {
    setIsDropdownView(false);
  }, 1000);
}

export function handlePart(event, form, setForm, setSelectPart) {
  if (form.part === event.target.id) {
    setForm({ ...form, part: '' });
    setSelectPart('파트 선택');
  } else {
    setForm({ ...form, part: event.target.id });
    if (event.target.id === 'PM/design') {
      setSelectPart('기획/디자인');
    } else if (event.target.id === 'front') {
      setSelectPart('프론트앤드');
    } else if (event.target.id === 'back') {
      setSelectPart('백앤드');
    }
  }
}
