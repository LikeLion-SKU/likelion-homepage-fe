import React, { useState } from "react";
import styles from "./styles/CustomDropdown.module.css";
import arrow_down from "../../assets/svgs/arrow_down.svg";

const CustomDropdown = ({
  options,
  defaultOption,
  onSelect,
  hideArrow = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    onSelect(option);
  };

  return (
    <div className={styles.customDropdown}>
      <div
        className={styles.selectedOption}
        data-type={selectedOption !== defaultOption ? selectedOption : null} // 선택된 옵션에 따라 data-type 설정
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
              className={styles.dropdownItem}
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
