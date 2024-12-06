export const options = [
  { value: 'frontEnd', label: '프론트엔드' },
  { value: 'backEnd', label: '백엔드' },
  { value: 'pmDesign', label: '기획/디자인' },
];

export const style = {
  control: (provided) => ({
    ...provided,
    width: '50%',
    fontSize: '1.6rem',
    fontWeight: 500,
    height: '50px',
  }),
  option: (provided, state) => ({
    ...provided,
    height: '40px',
    fontSize: '1.6rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    color: 'black',
    justifyContent: 'center',
    backgroundColor: state.isSelected
      ? 'rgba(215, 215, 223, 1)'
      : state.isFocused
        ? '#e5e5e5e2'
        : 'rgba(245, 245, 247, 1)',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none', // 화살표 왼쪽에 있는 선 제거
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: 'rgba(169, 169, 169, 1)',
    fontSize: '200px',
    transition: 'transform 0.3s ease', // 회전 애니메이션 추가
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
  menu: (provided) => ({
    ...provided,
    width: '50%',
  }),
};

export const questions = [
  ['이름', '학과', '학번', '전화번호', '이메일'],
  [
    '1.\n다양한 IT 동아리 중에서 멋쟁이 사자처럼 대학 12기를 선택하고 지원하시게 된 이유를 작성해주세요. 간단한 자기소개 및 멋쟁이사자처럼 대학 12기에 지원하는 이유에 대해서 자세하게 기술해주세요. ( 자기소개 / 장단점 / 지원 동기 ) ( 500자 이내 )',
    '2. 멋쟁이사자처럼을 통해 이루고 싶은 최종 목표와 멋쟁이사자처럼을 1년간 진행 후 자신이 어떻게 발전할 것 같은지 작성해주세요. ( 500자 이내 )',
    '3. 협업 경험이 있다면 힘들었던 점과 극복 과정을 적어주세요. 만약 협업 경험이 없을 경우, 팀원 간에 의견 마찰이 있을 때 어떻게 할 것인지 적어주세요. ( 500자 이내 )',
    '4. 멋쟁이사자처럼 대학은 주 1회 매주 월요일 18시 30분 교육 세션 필참 및 개인적으로 주 6시간 이상의 시간 투자를 권장합니다. 활동 기간 동안 매주 얼마만큼 시간을 할애할 수 있는지 작성해주세요.',
  ],
  ['어쩌구저쩌구3', '어쩌구저쩌구', '어쩌구저쩌구'],
];
