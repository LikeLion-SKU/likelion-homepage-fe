// SignupSection2 - 파트 드롭다운 메뉴 관련 함수 //
// 메뉴 버튼을 클릭했을때, 메뉴바가 올라가거나 내려감
export function handleSelectBox(event, isDropdownView, setIsDropdownView) {
  event.preventDefault;
  setIsDropdownView(!isDropdownView);
}

// 메뉴바가 내려간 상태일 때 메뉴 버튼 바깥 클릭 시, 메뉴바가 닫힘(파트를 선택할때도 시간차로 닫힘)
export function handleBlurSelcetBox(isDropdownView, setIsDropdownView) {
  setTimeout(() => {
    if (isDropdownView === true) {
      setIsDropdownView(false);
    }
  }, 100);
}

// 메뉴바의 파트를 클릭했을때, 클릭한 파트로 form.part, selectPart값을 변경
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
