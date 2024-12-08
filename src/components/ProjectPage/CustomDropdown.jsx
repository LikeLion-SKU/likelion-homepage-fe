import React, { useState } from "react";
import styles from "./styles/CustomDropdown.module.css";
import arrow_down from "../../assets/svgs/arrow_down.svg";

const CustomDropdown = ({
  options,
  defaultOption,
  onSelect,
  hideArrow = false,
  className = "", // 추가: 부모 컴포넌트에서 전달받는 클래스
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleSelect(option) {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    onSelect(option);
  }

  return (
    <div className={`${styles.customDropdown} ${className}`}>
    <div
      className={`${styles.selectedOption} ${
        selectedOption !== defaultOption ? styles[selectedOption] : ""
      }`}
      onClick={toggleDropdown}
    >
      <span className={styles.text}>{selectedOption}</span>
      {!hideArrow && <img src={arrow_down} alt="Arrow Down" className={styles.arrow} />}
    </div>
      {isDropdownOpen && (
        <ul className={styles.dropdownList}>
          {options.map((option, index) => (
            <li
              key={index}
              className={`${styles.dropdownItem} ${styles[option]}`} // 추가: 옵션에 따라 클래스 적용
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
