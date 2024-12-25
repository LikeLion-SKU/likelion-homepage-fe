import React from "react";
import styles from "./styles/InputTeamRole.module.css";
import TextareaAutosize from "react-textarea-autosize";

function InputTeamRole ({ teamMembers, onMemberChange }) {
  return (
    <div className={styles.teamBox}>
      {Object.entries(teamMembers).map(([role, value]) => (
        <div key={role} className={styles.teamRole}>
          <span className={styles.role}>{role}</span>
          <TextareaAutosize
            type="text"
            className={styles.memberInput}
            placeholder={`이름을 입력해주세요`} // 역할에 따른 placeholder
            value={value} // 초기값 설정
            onChange={(e) => onMemberChange(role, e.target.value)} // 역할별 입력값 업데이트
          />
        </div>
      ))}
    </div>
  );
};

export default InputTeamRole;
