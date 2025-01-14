import { useState } from 'react';
import styles from './CustomDropdown.module.css';
import arrow_down from '../../assets/svgs/arrow_down.svg';

function CustomDropdown({ options, defaultOption, onSelect, hideArrow = false }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  function toggleDropdown() {
    setIsDropdownOpen((prev) => !prev);
  }

  function handleSelect(option) {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    onSelect(option);
  }

  // 조건부 클래스 계산 함수
  const getDropdownClassName = () => {
    if (selectedOption === '중앙해커톤') return `${styles.customDropdown} ${styles.greenBackground}`;
    if (selectedOption === '아이디어톤') return `${styles.customDropdown} ${styles.yellowBackground}`;
    if (selectedOption === '자체프로젝트') return `${styles.customDropdown} ${styles.pinkBackground}`;
    return styles.customDropdown;
  };

  const dropdownClassName = getDropdownClassName();

  return (
    <div className={dropdownClassName}>
      <div
        className={styles.selectedOption}
        onClick={toggleDropdown}
      >
        <span className={styles.text}>{selectedOption}</span>
        {!hideArrow ? (
          <img
            src={arrow_down}
            alt='Arrow Down'
            className={styles.arrow}
          />
        ) : null}
      </div>
      {isDropdownOpen ? (
        <ul className={styles.dropdownList}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default CustomDropdown;
