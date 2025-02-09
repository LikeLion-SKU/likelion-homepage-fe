// 파트(part) 드롭아웃 메뉴 관련 함수
export function handleSelectBox(event, isDropdownView, setIsDropdownView) {
  event.preventDefault;
  setIsDropdownView(!isDropdownView);
}

export function handleBlurSelcetBox(isDropdownView, setIsDropdownView) {
  setTimeout(() => {
    if (isDropdownView === true) {
      setIsDropdownView(false);
    }
  }, 100);
}

export function handlePart(event, form, setForm, setSelectPart) {
  if (form.part === event.target.id) {
    setForm({ ...form, part: '' });
    setSelectPart('파트 선택');
    return;
  }

  setForm({ ...form, part: event.target.id });
  if (event.target.id === '기획/디자인') {
    setSelectPart('기획/디자인');
    return;
  }
  if (event.target.id === '프론트엔드') {
    setSelectPart('프론트엔드');
    return;
  }
  if (event.target.id === '백엔드') {
    setSelectPart('백엔드');
    return;
  }
  if (event.target.id === '기획') {
    setSelectPart('기획');
    return;
  }
  if (event.target.id === '디자인') {
    setSelectPart('디자인');
    return;
  }
}
