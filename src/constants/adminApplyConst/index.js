export const options = [
  {
    value: true,
    label: '합격',
  },
  {
    value: false,
    label: '불합격',
  },
];

export const style = {
  control: (provided) => ({
    ...provided,
    width: '50%',
    fontSize: '1.2rem',
    fontWeight: 500,
    height: '50px',
  }),
  option: (provided, state) => ({
    ...provided,
    height: '40px',
    fontSize: '1.4rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    color: 'black',
    justifyContent: 'center',
    backgroundColor: state.isSelected
      ? 'rgba(245, 245, 247, 1)' // 선택된 요소의 배경색 고정
      : state.isFocused
        ? '#e5e5e5' // 포커스된 경우
        : 'rgba(245, 245, 247, 1)', // 기본 배경색
    ':hover': {
      backgroundColor: '#e5e5e5', // Hover 시 색상
    },
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
