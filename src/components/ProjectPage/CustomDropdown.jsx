import { useState } from "react";
import styles from "./styles/CustomDropdown.module.css";
import arrow_down from "../../assets/svgs/arrow_down.svg";

function CustomDropdown ({
  options,
  defaultOption,
  onSelect,
  hideArrow = false,
}) {
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
    <div
      className={`${styles.customDropdown} ${
        selectedOption === "중앙해커톤"
          ? styles.greenBackground
          : selectedOption === "아이디어톤"
          ? styles.yellowBackground
          : selectedOption === "자체프로젝트"
          ? styles.pinkBackground
          : ""
      }`}
    >
      <div className={styles.selectedOption} onClick={toggleDropdown}>
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
